# Deploy Participant.js Fix to Production Server
# Run this script to fix the CastError issue

Write-Host "🚀 Deploying Participant.js fix to production..." -ForegroundColor Cyan

# Configuration
$LOCAL_FILE = "backend\models\Participant.js"
$SERVER = "root@svr"
$REMOTE_PATH = "/root/backend/models/Participant.js"

# Step 1: Upload the file
Write-Host "`n📤 Uploading updated Participant.js to server..." -ForegroundColor Yellow
scp $LOCAL_FILE "${SERVER}:${REMOTE_PATH}"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ File uploaded successfully!" -ForegroundColor Green
    
    # Step 2: Restart PM2
    Write-Host "`n🔄 Restarting PM2 backend process..." -ForegroundColor Yellow
    ssh $SERVER "pm2 restart backend"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backend restarted successfully!" -ForegroundColor Green
        
        # Step 3: Show logs
        Write-Host "`n📋 Checking logs (press Ctrl+C to exit)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 3
        ssh $SERVER "pm2 logs backend --lines 50"
    } else {
        Write-Host "❌ Failed to restart backend" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Failed to upload file. Please check:" -ForegroundColor Red
    Write-Host "   - SSH access to $SERVER is configured" -ForegroundColor Red
    Write-Host "   - The remote path exists: $REMOTE_PATH" -ForegroundColor Red
}
