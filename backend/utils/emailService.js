import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const createTransporter = () => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPassword) {
    console.error('ERROR: Missing Gmail credentials!');
    console.error(`GMAIL_USER: ${gmailUser ? 'SET' : 'NOT SET'}`);
    console.error(`GMAIL_APP_PASSWORD: ${gmailPassword ? 'SET' : 'NOT SET'}`);
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword
    }
  });
};

// Send welcome email
export const sendWelcomeEmail = async (email, userId, password, name) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '🎉 Welcome to Vignan Mahotsav 2026 - Your Registration Details',
      text: `
Dear ${name},

Welcome to Vignan Mahotsav 2026! 🎊

Your registration has been successfully completed. Here are your login credentials:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 Your Mahotsav ID: ${userId}
🔑 Password: ${password}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT: Please save these credentials for future reference.

You can now login to the Mahotsav portal using your email and password to:
✅ Register for events
✅ View your schedule
✅ Access event information
✅ Get updates and notifications

Event Details:
📅 Dates: February 5-7, 2026
📍 Venue: Vignan University Campus
🎯 Expected Participants: 5000+

If you have any questions or need assistance, feel free to contact our support team.

Best regards,
Vignan Mahotsav 2026 Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated email. Please do not reply to this message.
For support, contact: support@vignanmahotsav.edu
      `
    };

    console.log(`Sending welcome email to ${email} from ${process.env.GMAIL_USER}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully! Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error.message);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, name, userId, password) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '🔑 Password Recovery - Vignan Mahotsav 2026',
      text: `
Dear ${name},

You requested to recover your password for Vignan Mahotsav 2026.

Here are your login credentials:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 Your Mahotsav ID: ${userId}
📧 Email: ${email}
🔑 Password: ${password}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You can now login to the Mahotsav portal using your email and password.

SECURITY REMINDER:
✅ Please change your password after logging in
✅ Don't share your credentials with anyone
✅ Keep your Mahotsav ID safe for future reference

If you did not request this password reset, please contact our support team immediately.

Best regards,
Vignan Mahotsav 2026 Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated email. Please do not reply to this message.
For support, contact: support@vignanmahotsav.edu
      `
    };

    console.log(`Sending password reset email to ${email} from ${process.env.GMAIL_USER}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully! Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send password reset email:', error.message);
    return false;
  }
};

// Send event registration confirmation email
export const sendEventRegistrationEmail = async (email, name, eventName, registrationDetails) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `🎯 Event Registration Confirmed - ${eventName}`,
      text: `
Dear ${name},

Your registration for "${eventName}" has been confirmed! 🎉

Registration Details:
${registrationDetails}

Event Information:
📅 Date: February 5-7, 2026
📍 Venue: Vignan University Campus

Please arrive 15 minutes before the event starts and bring a valid ID.

Good luck and have fun!

Best regards,
Vignan Mahotsav 2026 Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated email. Please do not reply to this message.
For support, contact: support@vignanmahotsav.edu
      `
    };

    console.log(`Sending event registration email to ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Event registration email sent successfully! Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send event registration email:', error.message);
    return false;
  }
};
// Deprecated: this file is intentionally left blank. Email sending has been removed from the backend.
