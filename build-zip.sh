#!/bin/zsh
# Build a zip archive for Chrome Web Store upload, excluding hidden files and .git

ZIP_NAME="chatgpt-backup.zip"

# Remove any previous zip
rm -f "$ZIP_NAME"

# Create the zip, excluding .git, .DS_Store, node_modules, and dotfiles
zip -r "$ZIP_NAME" . \
  -x '*.git*' '*.DS_Store' 'node_modules/*' '.*' '*.zip'

echo "Created $ZIP_NAME for upload."
