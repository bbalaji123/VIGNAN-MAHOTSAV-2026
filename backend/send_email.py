import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Get environment variables directly (works better on Render)
gmail_user = os.environ.get('GMAIL_USER')
gmail_app_password = os.environ.get('GMAIL_APP_PASSWORD')

# Fallback: Try to load .env file for local development
if not gmail_user or not gmail_app_password:
    try:
        from dotenv import load_dotenv
        load_dotenv()
        gmail_user = os.environ.get('GMAIL_USER')
        gmail_app_password = os.environ.get('GMAIL_APP_PASSWORD')
    except ImportError:
        # If python-dotenv not installed, try to read .env manually
        env_path = os.path.join(os.path.dirname(__file__), '.env')
        if os.path.exists(env_path):
            with open(env_path) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        os.environ[key.strip()] = value.strip()
                        if key.strip() == 'GMAIL_USER':
                            gmail_user = value.strip()
                        elif key.strip() == 'GMAIL_APP_PASSWORD':
                            gmail_app_password = value.strip()

# Usage: python send_email.py "recipient@email.com" "userId" "password" "name"

if len(sys.argv) < 5:
    print('Usage: python send_email.py "recipient@email.com" "userId" "password" "name"')
    sys.exit(1)

to_email = sys.argv[1]
user_id = sys.argv[2]
password = sys.argv[3]
name = sys.argv[4]

if not gmail_user or not gmail_app_password:
    print('ERROR: Missing Gmail credentials!')
    print(f'GMAIL_USER: {"SET" if gmail_user else "NOT SET"}')
    print(f'GMAIL_APP_PASSWORD: {"SET" if gmail_app_password else "NOT SET"}')
    print('Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables on Render')
    sys.exit(2)

print(f'Sending email to {to_email} from {gmail_user}')

try:
    # Create email
    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = to_email
    msg['Subject'] = '🎉 Welcome to Vignan Mahotsav 2026 - Your Registration Details'
    
    body = f"""
Dear {name},

Welcome to Vignan Mahotsav 2026! 🎊

Your registration has been successfully completed. Here are your login credentials:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 Your Mahotsav ID: {user_id}
🔑 Password: {password}
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
"""
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Send via Gmail SMTP
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(gmail_user, gmail_app_password)
    
    text = msg.as_string()
    server.sendmail(gmail_user, to_email, text)
    server.quit()
    
    print('Email sent successfully!')
    sys.exit(0)
except Exception as e:
    print(f'Failed to send email: {e}')
    sys.exit(3)
