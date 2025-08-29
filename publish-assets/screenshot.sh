ffmpeg -i chat_backup.mov -vf "fps=1/2,scale=1280:800" -q:v 2 -vsync 0 -frames:v 5 output_%04d.jpg
