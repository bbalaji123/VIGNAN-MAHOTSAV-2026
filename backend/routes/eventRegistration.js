import express from 'express';
import EventRegistration from '../models/EventRegistration.js';
import Event from '../models/Event.js';
import UserEvent from '../models/UserEvent.js';
import Registration from '../models/Registration.js';
import mongoose from 'mongoose';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateRegistrationId, generateTeamId } from '../utils/idGenerator.js';
import { processIndividualRegistration, processTeamRegistration } from '../utils/queue.js';

const router = express.Router();
const execAsync = promisify(exec);

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  // Queue the registration to prevent concurrent registration conflicts
  try {
    const result = await processIndividualRegistration(async () => {
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        const { eventId, userId, participantName, email, phone, college } = req.body;

        // Validate required fields
        if (!eventId || !userId || !participantName || !email) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 400,
            success: false,
            message: 'Event ID, User ID, Name, and Email are required'
          };
        }

        // Get user details
        const user = await Registration.findOne({ userId }).session(session);
        if (!user) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 404,
            success: false,
            message: 'User not found'
          };
        }

        // Check if event exists
        const event = await Event.findById(eventId).session(session);
        if (!event) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 404,
            success: false,
            message: 'Event not found'
          };
        }

        // Check if user document exists, if not create it
        let userEvent = await UserEvent.findOne({ userId }).session(session);
        
        if (!userEvent) {
          // Create new user event document
          userEvent = new UserEvent({
            userId,
            userName: user.name,
            email: user.email,
            registeredEvents: []
          });
        }

        // Check if already registered for this event
        const alreadyRegistered = userEvent.registeredEvents.some(
          event => event.eventId.toString() === eventId
        );

        if (alreadyRegistered) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 400,
            success: false,
            message: 'You are already registered for this event'
          };
        }

        // Generate registration ID (queue ensures uniqueness)
        const registrationId = await generateRegistrationId(event.eventType);

        // Add event to user's registered events
        userEvent.registeredEvents.push({
          registrationId,
          registrationType: 'individual',
          eventId,
          eventName: event.eventName,
          eventType: event.eventType,
          participantName,
          phone,
          college,
          paymentStatus: 'unpaid',
          teamRole: 'none',
          registeredAt: new Date()
        });

        await userEvent.save({ session });

        // Also save to EventRegistration for backward compatibility
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

        await registration.save({ session });

        // Update event registered count
        await Event.findByIdAndUpdate(
          eventId,
          { $inc: { registeredCount: 1 } },
          { session }
        );

        // Deduct registration fee from user's amount (50 per event)
        const registrationFee = 50;
        await Registration.findOneAndUpdate(
          { userId },
          { $inc: { amount: -registrationFee } },
          { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Send confirmation email (after successful transaction)
        sendIndividualRegistrationEmail(email, registrationId, event.eventName, participantName)
          .then(success => {
            if (success) {
              console.log(`✅ Registration email sent to ${email}`);
            }
          })
          .catch(err => console.error(`❌ Email error:`, err.message));

        return {
          status: 201,
          success: true,
          message: 'Successfully registered for the event',
          data: {
            registrationId,
            eventName: event.eventName,
            participantName,
            totalEventsRegistered: userEvent.registeredEvents.length
          }
        };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        console.error('Individual registration error:', error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
          return {
            status: 409,
            success: false,
            message: 'Registration ID conflict. Please try again.',
            error: 'Duplicate registration detected'
          };
        }
        
        return {
          status: 500,
          success: false,
          message: 'Server error during registration',
          error: error.message
        };
      }
    });

    // Send the response from the queued task
    res.status(result.status).json({
      success: result.success,
      message: result.message,
      data: result.data,
      error: result.error
    });
  } catch (error) {
    console.error('Queue processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server busy. Please try again.',
      error: error.message
    });
  }
});

// Team Event Registration
router.post('/register-team', async (req, res) => {
  // Queue the registration to prevent concurrent registration conflicts
  try {
    const result = await processTeamRegistration(async () => {
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        const { eventId, teamName, captain, teamMembers } = req.body;

        // Validate required fields
        if (!eventId || !teamName || !captain || !captain.userId || !captain.name || !captain.email) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 400,
            success: false,
            message: 'Event ID, Team Name, and Captain details (User ID, Name, Email) are required'
          };
        }

        if (!teamMembers || teamMembers.length === 0) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 400,
            success: false,
            message: 'At least one team member is required'
          };
        }

        // Get captain user details
        const captainUser = await Registration.findOne({ userId: captain.userId }).session(session);
        if (!captainUser) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 404,
            success: false,
            message: 'Captain user not found'
          };
        }

        // Check if event exists
        const event = await Event.findById(eventId).session(session);
        if (!event) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 404,
            success: false,
            message: 'Event not found'
          };
        }

        // Check captain's user event document
        let captainUserEvent = await UserEvent.findOne({ userId: captain.userId }).session(session);
        
        if (!captainUserEvent) {
          captainUserEvent = new UserEvent({
            userId: captain.userId,
            userName: captainUser.name,
            email: captainUser.email,
            registeredEvents: []
          });
        }

        // Check if captain already registered for this event
        const alreadyRegistered = captainUserEvent.registeredEvents.some(
          event => event.eventId.toString() === eventId
        );

        if (alreadyRegistered) {
          await session.abortTransaction();
          session.endSession();
          return {
            status: 400,
            success: false,
            message: 'You have already registered a team for this event'
          };
        }

        // Generate team ID (queue ensures uniqueness)
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

        // Add to captain's user event document
        captainUserEvent.registeredEvents.push({
          registrationId: teamId,
          registrationType: 'team',
          eventId,
          eventName: event.eventName,
          eventType: event.eventType,
          teamId,
          teamName,
          teamRole: 'captain',
          captain: {
            userId: captain.userId,
            name: captain.name,
            email: captain.email
          },
          teamMembers: allMembers,
          teamSize: allMembers.length,
          paymentStatus: 'unpaid',
          registeredAt: new Date()
        });

        await captainUserEvent.save({ session });

        // Add to each team member's user event document
        for (const member of teamMembers) {
          if (member.userId) {
            let memberUserEvent = await UserEvent.findOne({ userId: member.userId }).session(session);
            
            if (!memberUserEvent) {
              memberUserEvent = new UserEvent({
                userId: member.userId,
                userName: member.name,
                email: member.email,
                registeredEvents: []
              });
            }

            // Check if member already registered for this event
            const memberAlreadyRegistered = memberUserEvent.registeredEvents.some(
              event => event.eventId.toString() === eventId
            );

            if (!memberAlreadyRegistered) {
              memberUserEvent.registeredEvents.push({
                registrationId: teamId,
                registrationType: 'team',
                eventId,
                eventName: event.eventName,
                eventType: event.eventType,
                teamId,
                teamName,
                teamRole: 'member',
                captain: {
                  userId: captain.userId,
                  name: captain.name,
                  email: captain.email
                },
                teamMembers: allMembers,
                teamSize: allMembers.length,
                paymentStatus: 'unpaid',
                registeredAt: new Date()
              });

              await memberUserEvent.save({ session });
            }
          }
        }

        // Also save to EventRegistration for backward compatibility
        const registration = new EventRegistration({
          registrationId: teamId,
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

        await registration.save({ session });

        // Update event registered count
        await Event.findByIdAndUpdate(
          eventId,
          { $inc: { registeredCount: allMembers.length } },
          { session }
        );

        // Deduct registration fee from captain's amount (50 per team registration)
        const teamRegistrationFee = 50;
        await Registration.findOneAndUpdate(
          { userId: captain.userId },
          { $inc: { amount: -teamRegistrationFee } },
          { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Send team registration email to captain (after successful transaction)
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

        return {
          status: 201,
          success: true,
          message: 'Team successfully registered for the event',
          data: {
            teamId,
            teamName,
            eventName: event.eventName,
            teamSize: allMembers.length,
            captainName: captain.name
          }
        };
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        
        console.error('Team registration error:', error);
        
        // Handle duplicate key errors
        if (error.code === 11000) {
          return {
            status: 409,
            success: false,
            message: 'Team ID conflict. Please try again.',
            error: 'Duplicate team registration detected'
          };
        }
        
        return {
          status: 500,
          success: false,
          message: 'Server error during team registration',
          error: error.message
        };
      }
    });

    // Send the response from the queued task
    res.status(result.status).json({
      success: result.success,
      message: result.message,
      data: result.data,
      error: result.error
    });
  } catch (error) {
    console.error('Queue processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server busy. Please try again.',
      error: error.message
    });
  }
});

// Get registrations by user ID - NEW: From single user document
router.get('/my-registrations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's event document containing all registrations
    const userEvent = await UserEvent.findOne({ userId })
      .populate('registeredEvents.eventId', 'eventName eventType venue date');

    if (!userEvent) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: {
          userId,
          userName: '',
          email: '',
          registeredEvents: []
        }
      });
    }

    res.status(200).json({
      success: true,
      count: userEvent.registeredEvents.length,
      data: {
        userId: userEvent.userId,
        userName: userEvent.userName,
        email: userEvent.email,
        registeredEvents: userEvent.registeredEvents,
        totalEvents: userEvent.registeredEvents.length
      }
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
