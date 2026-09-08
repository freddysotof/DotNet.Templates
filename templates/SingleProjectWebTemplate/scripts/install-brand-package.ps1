param (
    [string]$Company
)

$Company = $Company.Trim('"').Trim()

$ErrorActionPreference = "Stop"

Write-Host "✅ install-brand-package.ps1 script was executed"

# Use current working directory (project root)
$currentDir = Get-Location
$log = Join-Path $currentDir "install.log"

Add-Content -Path $log -Value "`n--- Run at $(Get-Date) ---"
Add-Content -Path $log -Value "Received Company: $Company"
Add-Content -Path $log -Value "Current Directory: $($currentDir.Path)"

# Find .csproj in current directory or subfolders
$projectPath = Get-ChildItem -Path $currentDir -Recurse -Filter *.csproj -File | Select-Object -First 1

if (-not $projectPath) {
    $msg = "❌ ERROR: No .csproj file found."
    Write-Host $msg
    Add-Content -Path $log -Value $msg
    exit 1
}

Add-Content -Path $log -Value "Using .csproj: $($projectPath.FullName)"

try {
    switch ($Company) {
        "Catador" {
            Write-Host "🔹 Installing CatadorSharedComponents..."
            dotnet add $projectPath.FullName package CatadorSharedComponents
        }
        "Bona" {
            Write-Host "🔹 Installing BonaAppsSharedComponents..."
            dotnet add $projectPath.FullName package BonaAppsSharedComponents
        }
        default {
            $msg = "⚠️ Unknown company value: $Company"
            Write-Host $msg
            Add-Content -Path $log -Value $msg
            exit 1
        }
    }

    Add-Content -Path $log -Value "✅ Package installation succeeded for $Company"
}
catch {
    $msg = "❌ Script failed with error: $_"
    Write-Host $msg
    Add-Content -Path $log -Value $msg
    exit 1
}
