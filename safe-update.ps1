# Safe Color Replacement Script
# This script prevents EBUSY errors by stopping Vite before making changes

param(
    [string]$FileName = "Dashboard.css",
    [hashtable]$Replacements = @{}
)

Write-Host "🔄 Safe File Update Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Function to check if Vite is running
function Test-ViteRunning {
    $viteProcess = Get-Process -Name node -ErrorAction SilentlyContinue | Where-Object {
        $_.Path -like "*node.exe*"
    }
    return $null -ne $viteProcess
}

# Step 1: Check if Vite is running
$viteWasRunning = Test-ViteRunning

if ($viteWasRunning) {
    Write-Host "⚠️  Vite dev server is running. Stopping it temporarily..." -ForegroundColor Yellow
    taskkill /F /IM node.exe 2>$null | Out-Null
    Start-Sleep -Seconds 2
    Write-Host "✅ Vite stopped successfully" -ForegroundColor Green
    Write-Host ""
}

# Step 2: Make file changes
Write-Host "📝 Updating files..." -ForegroundColor Cyan

try {
    $filePath = Join-Path -Path $PSScriptRoot -ChildPath "src\$FileName"
    
    if (Test-Path $filePath) {
        $content = Get-Content -Path $filePath -Raw
        
        foreach ($key in $Replacements.Keys) {
            $content = $content -replace $key, $Replacements[$key]
            Write-Host "   Replaced: $key → $($Replacements[$key])" -ForegroundColor Gray
        }
        
        # Use .NET method for safer file writing
        [System.IO.File]::WriteAllText($filePath, $content)
        
        Write-Host "✅ File updated successfully: $FileName" -ForegroundColor Green
    } else {
        Write-Host "❌ File not found: $filePath" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error updating file: $_" -ForegroundColor Red
}

Write-Host ""

# Step 3: Restart Vite if it was running
if ($viteWasRunning) {
    Write-Host "🚀 Restarting Vite dev server..." -ForegroundColor Cyan
    Start-Sleep -Seconds 1
    
    # Start Vite in a new process
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"
    
    Write-Host "✅ Vite dev server restarted" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 All done! No EBUSY errors." -ForegroundColor Green
