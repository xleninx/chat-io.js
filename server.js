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
  let fileName = path.join(__dirname, 'public', 'index.html') // use path for compatibility with other OS
  let rs = fs.createReadStream(fileName)

  res.setHeader('Content-Type', 'text/html')
  rs.pipe(res)

  res.on('error', function(err){
    res.end(err.message)
  })
}

function onListening(){
  console.log(`Server running in port ${port}`)
}
