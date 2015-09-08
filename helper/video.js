'use strict'

const os = require('os')
const async = require('async')
const path = require('path')
const fs = require('fs')
const dataURIBuffer = require('data-uri-to-buffer')
const uuid = require('uuid')
const EventEmitter = require('events').EventEmitter
const listFiles = require('./list.js')
const ffmpeg = require('./ffmpeg')
const concat = require('concat-stream')

module.exports = function (images){
  let events = new EventEmitter()
  let count = 0
  let baseName = uuid.v4()
  let tmpDir = os.tmpDir()
  let video

  async.series([
    decodeImages,
    createVideo,
    encodeVideo,
    cleanup
  ], convertFinish)

  function decodeImages(done){
    async.eachSeries(images, decodeImage, done)
  }

  function decodeImage(image, done){
    let fileName = `${baseName}-${count++}.jpg`
    let buffer = dataURIBuffer(image)
    let ws = fs.createWriteStream(path.join(tmpDir, fileName))

    ws.on('error', done)
    .end(buffer, done)

    events.emit('log', `Converting ${fileName}`)
  }

  function createVideo(done){
    ffmpeg({
      baseName: baseName,
      folder: tmpDir
    }, done)
  }

  function encodeVideo(done){
    let fileName = `${baseName}.webm`
    let rs = fs.createReadStream(path.join(tmpDir, fileName))

    rs.pipe(concat(function(videoBuffer){
      video = `data:video/webm;base64,${videoBuffer.toString('base64')}`
      done()
    }))

    rs.on('error', done)
  }

  function cleanup(done){
    events.emit('log', 'Cleaning up')
    listFiles(tmpDir, baseName, function(err, files){
      if (err) return done(err)
      deleteFiles(files, done)
    })
  }

  function deleteFiles(files, done){
    async.each(files,  deleteFile, done)
  }

  function deleteFile(file, done){
    events.emit('log', 'Deleting tmp files')
    fs.unlink(path.join(tmpDir, file), function(err){
      // ignore error

      done()
    })
  }

  function convertFinish(err){
    if (err) return events.emit('error', err)
    events.emit('video', video)
  }

  return events
}
