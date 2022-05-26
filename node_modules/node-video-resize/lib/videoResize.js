const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')
const ffmpeg = require('fluent-ffmpeg')

ffmpeg.setFfmpegPath(ffmpegInstaller.path)

/**
 *
 * inputPath {string} 视频传入地址
 * outputPath {string} 视频输出地址
 * format {string} 输出视频格式
 * size {string} 视频码率
 * videoCode {string} 编码格式
 *  */
const videoResize = opts => new Promise((resolve, reject) => {
    const { inputPath, outputPath, format, size } = opts
    if (!inputPath) return reject(new Error('please add video inputPath!!'))
    if (!outputPath) return reject(new Error('please add video outputPath!!'))
    if (!format) return reject(new Error('please add video format!!'))
    if (!size) return reject(new Error('please add video bitRate!!'))
    ffmpeg(inputPath)
      .videoCodec(opts.videoCodec || 'libx264')
      .format(format)
      .size(size)
      .on('error', err => {
        return reject(err)
      })
      .on('end', () => {
        return resolve({
          info: {
            inputPath,
            outputPath,
            format,
            size
          }
        })
      })
      .save(outputPath)
  })

module.exports = videoResize
