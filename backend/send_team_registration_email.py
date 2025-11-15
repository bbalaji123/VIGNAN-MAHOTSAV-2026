import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import json

load_dotenv()

def send_team_registration_email(to_email, team_id, team_name, event_name, captain_name, team_members):
    try:
        # Email configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = os.getenv('EMAIL_USER')
        sender_password = os.getenv('EMAIL_PASSWORD')
        
        # Validate email credentials
        if not sender_email or not sender_password:
            raise ValueError("Email credentials not found in environment variables")
        
        # Parse team members
        if isinstance(team_members, str):
            team_members = json.loads(team_members)
        
        # Create team members HTML
        members_html = ""
        for idx, member in enumerate(team_members, 1):
            role_badge = "👑 Captain" if member.get('role') == 'captain' else "👤 Member"
            members_html += f"""
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px;">{idx}</td>
              <td style="padding: 10px;"><strong>{member.get('name', 'N/A')}</strong></td>
              <td style="padding: 10px;">{member.get('userId', 'N/A')}</td>
              <td style="padding: 10px;">{member.get('college', 'N/A')}</td>
              <td style="padding: 10px;">{role_badge}</td>
            </tr>
            """
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Team Registration Confirmed - {event_name}"
        message["From"] = f"Vignan Mahotsav 2026 <{sender_email}>"
        message["To"] = to_email
        
        # HTML email body
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 700px; margin: 0 auto; padding: 20px; border: 2px solid #6a0dad; border-radius: 10px;">
              <h2 style="color: #6a0dad; text-align: center;">🎉 Team Registration Confirmed!</h2>
              
              <p>Dear <strong>{captain_name}</strong>,</p>
              
              <p>Congratulations! Your team <strong>"{team_name}"</strong> has been successfully registered for <strong>{event_name}</strong> at Vignan Mahotsav 2026.</p>
              
              <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #6a0dad; margin-top: 0;">Team Registration Details:</h3>
                <p><strong>Team ID:</strong> <span style="color: #e91e63; font-size: 20px;">{team_id}</span></p>
                <p><strong>Team Name:</strong> {team_name}</p>
                <p><strong>Event Name:</strong> {event_name}</p>
                <p><strong>Captain Name:</strong> {captain_name}</p>
                <p><strong>Team Size:</strong> {len(team_members)} members</p>
                <p><strong>Payment Status:</strong> <span style="color: red;">Unpaid</span></p>
              </div>
              
              <h3 style="color: #6a0dad;">Team Members:</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: white;">
                <thead>
                  <tr style="background-color: #6a0dad; color: white;">
                    <th style="padding: 12px; text-align: left;">#</th>
                    <th style="padding: 12px; text-align: left;">Name</th>
                    <th style="padding: 12px; text-align: left;">User ID</th>
                    <th style="padding: 12px; text-align: left;">College</th>
                    <th style="padding: 12px; text-align: left;">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {members_html}
                </tbody>
              </table>
              
              <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
                <p style="margin: 0;"><strong>⚠️ Important:</strong></p>
                <ul style="margin: 10px 0;">
                  <li>Please save this Team ID. All team members will need it for verification.</li>
                  <li>As the team captain, you are responsible for coordinating with your team members.</li>
                  <li>Share this Team ID with all team members.</li>
                  <li>All team members must arrive together for the event.</li>
                </ul>
              </div>
              
              <h3 style="color: #6a0dad;">Next Steps:</h3>
              <ol>
                <li>Share the Team ID with all team members</li>
                <li>Complete the payment process (if applicable)</li>
                <li>Review event rules and guidelines</li>
                <li>Coordinate with your team for practice sessions</li>
                <li>Arrive at the venue 45 minutes before the event starts</li>
                <li>All members must bring valid ID proof</li>
              </ol>
              
              <p>For any queries, please contact the event coordinators or reply to this email.</p>
              
              <p style="margin-top: 30px;">Best wishes to Team {team_name}!<br>
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
        
        print(f"Team registration email sent successfully to {to_email}")
        return True
        
    except Exception as e:
        print(f"Error sending team email: {str(e)}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 7:
        print("Usage: python send_team_registration_email.py <to_email> <team_id> <team_name> <event_name> <captain_name> <team_members_json>")
        sys.exit(1)
    
    to_email = sys.argv[1]
    team_id = sys.argv[2]
    team_name = sys.argv[3]
    event_name = sys.argv[4]
    captain_name = sys.argv[5]
    team_members_json = sys.argv[6]
    
    send_team_registration_email(to_email, team_id, team_name, event_name, captain_name, team_members_json)
