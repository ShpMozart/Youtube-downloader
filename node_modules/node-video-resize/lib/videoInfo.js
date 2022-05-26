const ffmpeg = require('fluent-ffmpeg')

const loadVideoInfo = (videoPath) => new Promise((resolve, reject) => {
  ffmpeg.ffprobe(videoPath, (err, metadata) => {
    if (err) return reject(err)
    return resolve(metadata) 
  })
})

module.exports = loadVideoInfo
