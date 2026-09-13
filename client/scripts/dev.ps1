$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$launcher = Join-Path $projectRoot "scripts\dev.ps1"

& powershell.exe -ExecutionPolicy Bypass -File $launcher
