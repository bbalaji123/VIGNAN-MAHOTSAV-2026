import express from 'express';
import EventRegistration from '../models/EventRegistration.js';
import Event from '../models/Event.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const execAsync = promisify(exec);

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to generate registration ID for individual
async function generateRegistrationId(eventType) {
  try {
    const prefix = eventType === 'sports' ? 'SR' : eventType === 'culturals' ? 'CR' : 'ER';
    const lastRegistration = await EventRegistration.findOne({ registrationType: 'individual' })
      .sort({ registrationId: -1 })
      .select('registrationId');
    
    if (!lastRegistration || !lastRegistration.registrationId) {
      return `${prefix}26000001`;
    }
    
    const lastNumber = parseInt(lastRegistration.registrationId.substring(2));
    const nextNumber = lastNumber + 1;
    return `${prefix}${nextNumber.toString().padStart(8, '0')}`;
  } catch (error) {
    console.error('Error generating registration ID:', error);
    throw error;
  }
}

// Helper function to generate team ID
async function generateTeamId(eventType) {
  try {
    const prefix = eventType === 'sports' ? 'ST' : eventType === 'culturals' ? 'CT' : 'ET';
    const lastTeam = await EventRegistration.findOne({ registrationType: 'team' })
      .sort({ teamId: -1 })
      .select('teamId');
    
    if (!lastTeam || !lastTeam.teamId) {
      return `${prefix}26000001`;
    }
    
    const lastNumber = parseInt(lastTeam.teamId.substring(2));
    const nextNumber = lastNumber + 1;
    return `${prefix}${nextNumber.toString().padStart(8, '0')}`;
  } catch (error) {
    console.error('Error generating team ID:', error);
    throw error;
  }
}

// Helper function to send team registration email
async function sendTeamRegistrationEmail(captainEmail, teamId, teamName, eventName, captainName, teamMembers) {
  try {
    const scriptPath = path.join(__dirname, '..', 'send_team_registration_email.py');
    const teamMembersJson = JSON.stringify(teamMembers);
    const command = `python "${scriptPath}" "${captainEmail}" "${teamId}" "${teamName}" "${eventName}" "${captainName}" '${teamMembersJson}'`;
    
    console.log(`Sending team registration email to ${captainEmail}...`);
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Email stderr:', stderr);
    }
    console.log('Email stdout:', stdout);
    
    return true;
  } catch (error) {
    console.error('Failed to send team registration email:', error.message);
    return false;
  }
}

// Helper function to send individual registration email
async function sendIndividualRegistrationEmail(email, registrationId, eventName, participantName) {
  try {
    const scriptPath = path.join(__dirname, '..', 'send_event_registration_email.py');
    const command = `python "${scriptPath}" "${email}" "${registrationId}" "${eventName}" "${participantName}"`;
    
    console.log(`Sending event registration email to ${email}...`);
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Email stderr:', stderr);
    }
    console.log('Email stdout:', stdout);
    
    return true;
  } catch (error) {
    console.error('Failed to send event registration email:', error.message);
    return false;
  }
}

// Individual Event Registration
router.post('/register-individual', async (req, res) => {
  try {
    const { eventId, userId, participantName, email, phone, college } = req.body;

    // Validate required fields
    if (!eventId || !userId || !participantName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Event ID, User ID, Name, and Email are required'
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user already registered for this event
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      userId,
      registrationType: 'individual'
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    // Generate registration ID
    const registrationId = await generateRegistrationId(event.eventType);

    // Create registration
    const registration = new EventRegistration({
      registrationId,
      registrationType: 'individual',
      eventId,
      eventName: event.eventName,
      eventType: event.eventType,
      userId,
      participantName,
      email,
      phone,
      college,
      paymentStatus: 'unpaid'
    });

    await registration.save();

    // Update event registered count
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: 1 }
    });

    // Send confirmation email
    sendIndividualRegistrationEmail(email, registrationId, event.eventName, participantName)
      .then(success => {
        if (success) {
          console.log(`✅ Registration email sent to ${email}`);
        }
      })
      .catch(err => console.error(`❌ Email error:`, err.message));

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event',
      data: {
        registrationId,
        eventName: event.eventName,
        participantName
      }
    });
  } catch (error) {
    console.error('Individual registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// Team Event Registration
router.post('/register-team', async (req, res) => {
  try {
    const { eventId, teamName, captain, teamMembers } = req.body;

    // Validate required fields
    if (!eventId || !teamName || !captain || !captain.userId || !captain.name || !captain.email) {
      return res.status(400).json({
        success: false,
        message: 'Event ID, Team Name, and Captain details (User ID, Name, Email) are required'
      });
    }

    if (!teamMembers || teamMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one team member is required'
      });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if captain already registered a team for this event
    const existingTeam = await EventRegistration.findOne({
      eventId,
      'captain.userId': captain.userId,
      registrationType: 'team'
    });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered a team for this event'
      });
    }

    // Generate team ID
    const teamId = await generateTeamId(event.eventType);

    // Prepare team members with captain role
    const allMembers = [
      {
        ...captain,
        role: 'captain'
      },
      ...teamMembers.map(member => ({
        ...member,
        role: 'member'
      }))
    ];

    // Create team registration
    const registration = new EventRegistration({
      registrationId: teamId, // Use teamId as registrationId for teams
      registrationType: 'team',
      eventId,
      eventName: event.eventName,
      eventType: event.eventType,
      teamId,
      teamName,
      captain: {
        userId: captain.userId,
        name: captain.name,
        email: captain.email,
        phone: captain.phone || '',
        college: captain.college || ''
      },
      teamMembers: allMembers,
      teamSize: allMembers.length,
      paymentStatus: 'unpaid'
    });

    await registration.save();

    // Update event registered count
    await Event.findByIdAndUpdate(eventId, {
      $inc: { registeredCount: allMembers.length }
    });

    // Send team registration email to captain
    sendTeamRegistrationEmail(
      captain.email,
      teamId,
      teamName,
      event.eventName,
      captain.name,
      allMembers
    )
      .then(success => {
        if (success) {
          console.log(`✅ Team registration email sent to ${captain.email}`);
        }
      })
      .catch(err => console.error(`❌ Email error:`, err.message));

    res.status(201).json({
      success: true,
      message: 'Team successfully registered for the event',
      data: {
        teamId,
        teamName,
        eventName: event.eventName,
        teamSize: allMembers.length,
        captainName: captain.name
      }
    });
  } catch (error) {
    console.error('Team registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during team registration',
      error: error.message
    });
  }
});

// Get registrations by user ID
router.get('/my-registrations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const registrations = await EventRegistration.find({
      $or: [
        { userId },
        { 'captain.userId': userId },
        { 'teamMembers.userId': userId }
      ]
    }).sort({ registrationDate: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
});

// Get all registrations for an event
router.get('/event-registrations/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await EventRegistration.find({ eventId })
      .sort({ registrationDate: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Fetch event registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching event registrations',
      error: error.message
    });
  }
});

export default router;
