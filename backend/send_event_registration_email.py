import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def send_event_registration_email(to_email, registration_id, event_name, participant_name):
    try:
        # Email configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = os.getenv('EMAIL_USER')
        sender_password = os.getenv('EMAIL_PASSWORD')
        
        # Validate email credentials
        if not sender_email or not sender_password:
            raise ValueError("Email credentials not found in environment variables")
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Event Registration Confirmed - {event_name}"
        message["From"] = f"Vignan Mahotsav 2026 <{sender_email}>"
        message["To"] = to_email
        
        # HTML email body
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #6a0dad; border-radius: 10px;">
              <h2 style="color: #6a0dad; text-align: center;">🎉 Event Registration Confirmed!</h2>
              
              <p>Dear <strong>{participant_name}</strong>,</p>
              
              <p>Congratulations! You have successfully registered for <strong>{event_name}</strong> at Vignan Mahotsav 2026.</p>
              
              <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #6a0dad; margin-top: 0;">Your Registration Details:</h3>
                <p><strong>Registration ID:</strong> <span style="color: #e91e63; font-size: 18px;">{registration_id}</span></p>
                <p><strong>Event Name:</strong> {event_name}</p>
                <p><strong>Participant Name:</strong> {participant_name}</p>
                <p><strong>Payment Status:</strong> <span style="color: red;">Unpaid</span></p>
              </div>
              
              <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <p style="margin: 0;"><strong>⚠️ Important:</strong> Please save this Registration ID. You will need it for check-in and verification during the event.</p>
              </div>
              
              <h3 style="color: #6a0dad;">Next Steps:</h3>
              <ol>
                <li>Complete the payment process (if applicable)</li>
                <li>Check event schedule and venue details</li>
                <li>Arrive at the venue 30 minutes before the event starts</li>
                <li>Bring a valid ID proof and your registration ID</li>
              </ol>
              
              <p>For any queries, please contact the event coordinators or reply to this email.</p>
              
              <p style="margin-top: 30px;">Best wishes,<br>
              <strong>Team Vignan Mahotsav 2026</strong></p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #666; text-align: center;">
                This is an automated email. Please do not reply directly to this message.
              </p>
            </div>
          </body>
        </html>
        """
        
        # Attach HTML content
        part = MIMEText(html, "html")
        message.attach(part)
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)
        
        print(f"Event registration email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python send_event_registration_email.py <to_email> <registration_id> <event_name> <participant_name>")
        sys.exit(1)
    
    to_email = sys.argv[1]
    registration_id = sys.argv[2]
    event_name = sys.argv[3]
    participant_name = sys.argv[4]
    
    send_event_registration_email(to_email, registration_id, event_name, participant_name)
