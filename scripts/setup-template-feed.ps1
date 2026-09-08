# setup-template-feed.ps1

param (
    [string]$Organization = "DevSharedProjects",  # 🔁 Replace with your Azure DevOps org
    [string]$Feed = "DevSharedProjects"          # 🔁 Replace with your Azure Artifacts feed name
)


# Construct the Azure Artifacts NuGet v3 URL
$sourceUrl = "https://pkgs.dev.azure.com/$Organization/_packaging/$Feed/nuget/v3/index.json"

Write-Host "`n📦 Setting up Azure Artifacts NuGet feed:" -ForegroundColor Cyan
Write-Host "  Organization : $Organization"
Write-Host "  Feed         : $Feed"
Write-Host "  Source Name  : $Feed"
Write-Host "  Feed URL     : $sourceUrl`n"

# Prompt for PAT securely
$securePAT = Read-Host "🔐 Enter your Azure DevOps Personal Access Token (PAT)" -AsSecureString
$plainPAT = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePAT)
)

# Check if source already exists and remove it
$existingSources = dotnet nuget list source | Select-String "^  .* $Feed "
if ($existingSources) {
    Write-Host "ℹ️  NuGet source '$Feed' already exists. Removing it..." -ForegroundColor Yellow
    dotnet nuget remove source $Feed | Out-Null

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Removed existing source '$Feed'" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to remove existing source '$Feed'" -ForegroundColor Red
        exit 1
    }
}

# Add the source using the provided PAT
Write-Host "`n🔧 Running dotnet nuget add source..."
Write-Host "  Source Name  : $Feed"
$addResult = dotnet nuget add source `
    --name "$Feed" `
    --username "AzureDevOps" `
    --password "$plainPAT" `
    --store-password-in-clear-text `
    "$sourceUrl" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ NuGet source '$Feed' added successfully!" -ForegroundColor Green
    Write-Host "`nYou can now install templates using:" -ForegroundColor Yellow
    # Write-Host "  dotnet new install CataBon.DotNet.Templates --add-source $sourceUrl`n"
    Write-Host "  dotnet new install CataBon.DotNet.Templates `n"
} else {
    Write-Host "`n❌ Failed to add the NuGet source." -ForegroundColor Red
    Write-Host "`n📄 Output from dotnet:" -ForegroundColor Gray
    Write-Host $addResult
}
