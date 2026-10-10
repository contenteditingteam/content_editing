# Deploys the five Edge Functions and sets their secrets on the Content Editing Supabase project.
# Run from the project folder (C:\ce) in PowerShell:   .\scripts\deploy-supabase.ps1
#
# Before you start:
#  1. Sign in to supabase.com with the account that OWNS the contentediting project.
#  2. Open https://supabase.com/dashboard/account/tokens -> Generate new token -> copy it.
#  3. In PowerShell:   $env:SUPABASE_ACCESS_TOKEN = "paste-the-token-here"
#     (this only lives in this window; do not share the token or write it in any file)
# The script asks for the other secrets as hidden input, so nothing is stored or printed.

$ErrorActionPreference = "Stop"
$ref = "furnjgsmfigplxmgwjmm"   # the contentediting project

if (-not $env:SUPABASE_ACCESS_TOKEN) { throw "Set `$env:SUPABASE_ACCESS_TOKEN first (see the notes at the top of this file)." }

# Safety: make sure the token can see THIS project and is not some other account.
$projects = (npx --yes supabase projects list -o json | ConvertFrom-Json)
$list = if ($projects.projects) { $projects.projects } else { $projects }
if (-not ($list | Where-Object { $_.ref -eq $ref })) { throw "This token cannot see project $ref. Use a token from the account that owns the contentediting project." }
Write-Host "Project found. Deploying..." -ForegroundColor Green

# name, needs a logged-in user (JWT check on)?
$functions = @(
  @{ name = "verify-order";     jwt = $true  },
  @{ name = "payments";         jwt = $true  },
  @{ name = "delete-account";   jwt = $true  },
  @{ name = "send-email";       jwt = $false },   # called by database webhooks, protected by WEBHOOK_SECRET
  @{ name = "razorpay-webhook"; jwt = $false }    # called by Razorpay, protected by its signature
)
foreach ($f in $functions) {
  Write-Host ("Deploying " + $f.name + " ...")
  $cliArgs = @("functions", "deploy", $f.name, "--project-ref", $ref, "--use-api")
  if (-not $f.jwt) { $cliArgs += "--no-verify-jwt" }
  npx --yes supabase @cliArgs
  if ($LASTEXITCODE -ne 0) { throw ("Deploy failed for " + $f.name) }
}

function Ask-Secret($label) {
  $s = Read-Host -AsSecureString $label
  $p = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($s))
  return $p
}

Write-Host ""
Write-Host "Now the secrets. Press Enter to skip any you already set." -ForegroundColor Cyan
$webhook = -join ((48..57) + (97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ })
$pairs = [ordered]@{
  "RESEND_API_KEY"          = Ask-Secret "Resend API key"
  "RAZORPAY_KEY_ID"         = Ask-Secret "Razorpay Key Id (rzp_test_... or rzp_live_...)"
  "RAZORPAY_KEY_SECRET"     = Ask-Secret "Razorpay Key Secret"
  "RAZORPAY_WEBHOOK_SECRET" = Ask-Secret "Razorpay webhook secret (from Razorpay -> Webhooks)"
}
$set = @()
foreach ($k in $pairs.Keys) { if ($pairs[$k]) { $set += "$k=$($pairs[$k])" } }
$set += "WEBHOOK_SECRET=$webhook"
npx --yes supabase secrets set --project-ref $ref @set
if ($LASTEXITCODE -ne 0) { throw "Setting secrets failed." }

Write-Host ""
Write-Host "Done. Use this value as the x-webhook-secret header on the three database webhooks (orders, contact_messages, order_messages):" -ForegroundColor Green
Write-Host $webhook -ForegroundColor Yellow
Write-Host "Copy it now; it is not shown again. Then in Supabase: Database -> Webhooks -> each webhook -> HTTP headers."
