#!/bin/sh
# This script is used to inject the runtime environment variables into the index.html file

set -e # Exit immediately if a command fails

# 1. Prepare the JSON
JSON_VARS=$(env | grep VITE_ | awk -F= '{printf "\"%s\":\"%s\",", $1, $2}' | sed 's/,$//')
FINAL_JSON="{$JSON_VARS}"
REPLACEMENT="if(typeof window !== 'undefined'){Object.defineProperty(window, '__ENV_CONFIG__', {value: Object.freeze($FINAL_JSON), writable: false, configurable: false, enumerable: true});}"

# 2. Inject into index.html
sed -i "s|\"__RUNTIME_CONFIG_PLACEHOLDER__\"|$REPLACEMENT|g" "/usr/share/nginx/html/index.html"

echo "Injection complete."

# Execute the command passed from CMD
exec "$@"
