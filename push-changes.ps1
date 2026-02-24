$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Staging changes..."
git add .

Write-Host "Committing changes..."
git commit -m "feat: complete UI/UX Pro Max improvements and audit walkthrough"

Write-Host "Pushing to origin main..."
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Error "Git command failed with exit code $LASTEXITCODE"
} else {
    Write-Host "Successfully pushed to GitHub."
}
