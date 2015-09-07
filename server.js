'use strict' // this is for make code clean with ES6

// Constants
const http = require('http')
const port = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')
const server = http.createServer(onRequest)

// EventEmitter
server.on('request', onRequest)
server.on('listening', onListening)

// Call listen to server
server.listen(port)

// Functions
function onRequest(req, res){
  let fileName = path.join(__dirname, 'public', 'index.html')
  fs.readFile(fileName, function(err, file){
    if (err){
      return res.end(err.message)
    }
    res.setHeader('Content-Type', 'text/html')
    res.end(file)
  })
}

function onListening(){
  console.log(`Server running in port ${port}`)
}
