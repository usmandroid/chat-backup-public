# Usage: sh marquee.sh input_image.jpg output_tile.png

INPUT="$1"
OUTPUT="$2"

# Center crop to 2.5:1 aspect ratio, then resize to 1400x560, output 24-bit PNG/JPEG
ffmpeg -i "$INPUT" -vf "crop=if(gt(iw/2.5\,ih)\,ih*2.5\,iw):if(gt(iw/2.5\,ih)\,ih\,iw/2.5):(iw-if(gt(iw/2.5\,ih)\,ih*2.5\,iw))/2:(ih-if(gt(iw/2.5\,ih)\,ih\,iw/2.5))/2,scale=1400:560,format=rgb24" -y "$OUTPUT"
