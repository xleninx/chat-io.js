'use strict' // this is for make code clean with ES6

// Constants
const http = require('http')
const port = process.env.PORT || 3000
const fs = require('fs')
const router = require('./router')
const server = http.createServer()
const realtime = require('./realtime')
// EventEmitter
realtime(server)
server.on('request', router)
server.on('listening', onListening)

// Call listen to server
server.listen(port)

function onListening(){
  console.log(`Server running in port ${port}`)
}
