# Usage: sh make_small_promo_tile.sh input_image.jpg output_tile.png

# This script crops and resizes an input image to 440x280 pixels for a Chrome Web Store small promo tile.
# It outputs a 24-bit PNG with no alpha channel.

INPUT="$1"
OUTPUT="$2"

# Crop (centered) and resize to 440x280, remove alpha channel if present
ffmpeg -i "$INPUT" -vf "crop='min(iw,ih*1.571)':ih,scale=440:280,format=rgb24" -y "$OUTPUT"
