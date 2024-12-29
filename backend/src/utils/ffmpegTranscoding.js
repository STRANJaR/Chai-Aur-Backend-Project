import ffmpeg from 'fluent-ffmpeg';


const transcodeToHLS = (inputFile, outputFolder) => {

    
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .output(`${outputFolder}/240p.m3u8`)
            .videoCodec('libx264')
            .audioCodec('aac')
            .size('426x240')
            .outputOptions([
                '-hls_time 10',
                '-hls_playlist_type vod'
            ])
            .on('end', () => resolve('240p Transcoding finished'))
            .on('error', (err) => reject(err))
            .run();
    });
};

transcodeToHLS('input.mp4', 'output')
    .then(console.log)
    .catch(console.error);
