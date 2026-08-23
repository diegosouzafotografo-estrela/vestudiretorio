#!/usr/bin/env bash
set -euo pipefail

# Netlify's upload API now requires an intermediate deploy state. The CLI
# handles that lifecycle and fails the release when the deploy is not ready.
SITE_ID="${NETLIFY_SITE_ID:-748df220-e3e4-45f8-99bd-1defffa1f5f3}"
TOKEN="${NETLIFY_AUTH_TOKEN:-nfp_ndf8vgr2LJtznSFvQf1TDV4CqbFPSXcV8fd1}"
DIST_DIR="${1:-dist}"

echo "🚀 Deploying to Netlify..."
NETLIFY_AUTH_TOKEN="$TOKEN" netlify deploy --dir="$DIST_DIR" --prod --site="$SITE_ID" --json
echo "✅ Deploy complete!"
