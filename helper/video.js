'use strict'
const async = require('async')
const EventEmitter = require('events').EventEmitter

module.exports = function (images){
  let events = new EventEmitter()

  async.series([
    decodeImages,
    createVideo,
    encodeVideo,
    cleanup
  ], convertFinish)

  function decodeImages(done){
    done()
  }

  function createVideo(done){
    done()
  }

  function encodeVideo(done){
    done()
  }

  function cleanup(done){
    done()
  }

  function convertFinish(err){
    setTimeout(function(){
      events.emit('video', 'this will be the encoded video')
    }, 1000)
  }

  return events
}
