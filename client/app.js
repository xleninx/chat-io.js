'use strict'
const Webrtc2Images = require('webrtc2images')
const xhr = require('xhr')
const rtc = new Webrtc2Images({
  width: 200,
  height: 200,
  frames: 10,
  type: 'image/jpeg',
  quality: 0.4,
  interval: 200
})

rtc.startVideo(function(err){
  if (err) return logError(err)
})

const record = document.querySelector('#record')
record.addEventListener('click', function(e){
  e.preventDefault()

  rtc.recordVideo(function(err, frames){
    if (err) return logError(err)

    xhr({
      uri: '/process',
      method: 'post',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify({ images: frames })
    }, function(err, res, body){
      if (err) return logError(err)

      body = JSON.parse(body)

      if(body.video){
        const video = document.querySelector('#video')
        video.src = body.video
        video.loop = true
        video.play()
      }
    })
  })
}, false)

function logError(err){
  console.log(err)
}
