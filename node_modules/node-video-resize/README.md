# node-video-resize

video resize.

## example

* load video info

```javascript
const { loadVideoInfo } = require('./')
const path = require('path')

const videoPath = path.resolve(__dirname, './__tests__/test.mp4')

const bootstrap = async () => {
  const ret = await loadVideoInfo(videoPath)
  console.log(ret)
}

bootstrap()
```

* resize video

```javascript
const { videoResize } = require('./')
const path = require('path')

const videoPath = path.resolve(__dirname, './__tests__/test.mp4')
const outputPath = path.resolve(__dirname, './video/output.mp4')

const bootstrap = async () => {
  const ret = await videoResize({
    inputPath: videoPath,
    outputPath,
    format: 'mp4',
    size: '640x480'
  })
  console.log(ret)
}

bootstrap()
```
