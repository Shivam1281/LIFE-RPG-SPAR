$projectRoot = Split-Path -Parent $PSScriptRoot
$clientPath = Join-Path $projectRoot "client"
$serverPath = Join-Path $projectRoot "server"

Write-Host "Starting the Life RPG server..."
Start-Process powershell.exe `
  -WorkingDirectory $serverPath `
  -ArgumentList @("-NoExit", "-Command", "npm run dev") `
  -WindowStyle Normal

Write-Host "Starting the Life RPG client..."
Set-Location $clientPath
& npm run vite -- --host 0.0.0.0
