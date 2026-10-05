#!/bin/sh
# Regenerates config.js from .env  (run: sh scripts/make-config.sh)
. "$(dirname "$0")/../.env"
printf 'window.SUPABASE_URL = "%s";\nwindow.SUPABASE_ANON_KEY = "%s";\n' "$SUPABASE_URL" "$SUPABASE_ANON_KEY" > "$(dirname "$0")/../config.js"
