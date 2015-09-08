'use strict'
const helper = require('../helper')
const socketio = require('socket.io')

module.exports = function(server){
  const io = socketio(server)

  io.on('connection', onConnection)

  function onConnection(socket){
    console.log(`Client connected ${socket.id}`)

    socket.on('message', function(message){
      const converter = helper.convertVideo(message.frames)
      converter.on('log', console.log)
      converter.on('video', function(video){
        delete message.frames
        message.video = video

        socket.broadcast.emit('message', message)
        socket.emit('messageack', message)
      })
    })
  }

  function onMessage(){

  }
}
