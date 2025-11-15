import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Load .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip()

# Usage: python send_password_reset.py "recipient@email.com" "name" "userId" "password"

if len(sys.argv) < 5:
    print('Usage: python send_password_reset.py "email" "name" "userId" "password"')
    sys.exit(1)

to_email = sys.argv[1]
name = sys.argv[2]
user_id = sys.argv[3]
password = sys.argv[4]

# Get Gmail credentials
gmail_user = os.getenv('GMAIL_USER')
gmail_app_password = os.getenv('GMAIL_APP_PASSWORD')

if not gmail_user or not gmail_app_password:
    print('ERROR: Missing Gmail credentials!')
    print('Set GMAIL_USER and GMAIL_APP_PASSWORD in .env')
    sys.exit(2)

print(f'Sending password reset email to {to_email}')

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
