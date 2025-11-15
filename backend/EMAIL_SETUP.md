# Email Sending Setup

## Install Python Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

## Test Email Sending

```powershell
python send_email.py "test@example.com" "MH26000001" "testpass123" "Test User"
```

## How It Works

When a user registers:
1. ✅ User data is saved to MongoDB
2. 📧 An automated email is sent to their Gmail with:
   - Their Mahotsav ID (e.g., MH26000001)
   - Their password
   - Welcome message and event details
3. 🎉 User sees popup with their ID
4. 📨 User receives email confirmation

## Gmail Credentials

Already configured in `.env`:
- `GMAIL_USER=mahotsavvignan2025@gmail.com`
- `GMAIL_APP_PASSWORD=sfpgnlnloxthfhxt`

## Troubleshooting

**Email not sending?**
1. Check Python is installed: `python --version`
2. Install dependencies: `pip install -r requirements.txt`
3. Check `.env` has Gmail credentials
4. Check Gmail App Password is valid
5. Check spam folder in recipient email

**Note**: Email sending happens in background. Registration succeeds even if email fails.
