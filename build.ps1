$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "Running Linter..."
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Error "Linting failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}

Write-Host "Running Build..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}

Write-Host "Build and Lint completed successfully."
