'use strict' // this is for make code clean with ES6

// Constants
const http = require('http')
const port = process.env.PORT || 3000
const fs = require('fs')
const path = require('path')
const server = http.createServer()

// EventEmitter
server.on('request', onRequest)
server.on('listening', onListening)

// Call listen to server
server.listen(port)

// Functions
function onRequest(req, res){
  let uri = req.url

  if ( uri.startsWith('/index') || uri === '/' ){
    return serveIndex(res)
  }
  if ( uri.startsWith('/app.js') ){
    return serveApp(res)
  }

  res.statusCode = 404
  res.end(`404 not found ${uri}`)
}

function serveIndex(res){
  let fileName = path.join(__dirname, 'public', 'index.html') // use path for compatibility with other OS
  let rs = fs.createReadStream(fileName)

  res.setHeader('Content-Type', 'text/html')
  rs.pipe(res)

  res.on('error', function(err){
    res.setHeader('Content-Type', 'text/pain')
    res.end(err.message)
  })
}

function serveApp(res){
  let app = path.join(__dirname, 'public', 'app.js') // use path for compatibility with other OS
  let rs = fs.createReadStream(app)

  res.setHeader('Content-Type', 'text/javascript')
  rs.pipe(res)

  res.on('error', function(err){
    res.setHeader('Content-Type', 'text/pain')
    res.end(err.message)
  })
}

function onListening(){
  console.log(`Server running in port ${port}`)
}
