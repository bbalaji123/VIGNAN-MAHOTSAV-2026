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

# Usage: python send_password_reset.py "recipient@email.com" "name" "userId" "password"

if len(sys.argv) < 5:
    print('Usage: python send_password_reset.py "email" "name" "userId" "password"')
    sys.exit(1)

to_email = sys.argv[1]
name = sys.argv[2]
user_id = sys.argv[3]
password = sys.argv[4]

if not gmail_user or not gmail_app_password:
    print('ERROR: Missing Gmail credentials!')
    print(f'GMAIL_USER: {"SET" if gmail_user else "NOT SET"}')
    print(f'GMAIL_APP_PASSWORD: {"SET" if gmail_app_password else "NOT SET"}')
    print('Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables on Render')
    sys.exit(2)

print(f'Sending password reset email to {to_email} from {gmail_user}')

try:
    # Create email
    msg = MIMEMultipart()
    msg['From'] = gmail_user
    msg['To'] = to_email
    msg['Subject'] = '🔑 Password Recovery - Vignan Mahotsav 2026'
    
    body = f"""
Dear {name},

You requested to recover your password for Vignan Mahotsav 2026.

Here are your login credentials:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 Your Mahotsav ID: {user_id}
📧 Email: {to_email}
🔑 Password: {password}
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
"""
    
    msg.attach(MIMEText(body, 'plain'))
    
    # Send via Gmail SMTP
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(gmail_user, gmail_app_password)
    
    text = msg.as_string()
    server.sendmail(gmail_user, to_email, text)
    server.quit()
    
    print('Password reset email sent successfully!')
    sys.exit(0)
except Exception as e:
    print(f'Failed to send email: {e}')
    sys.exit(3)
