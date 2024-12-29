FROM ubuntu:20.04

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY . /app/

CMD ["bash", "-c", "while :; do sleep 10; done"]
