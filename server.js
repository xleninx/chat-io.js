'use stric' // this is for make code clean with ES6

const http = require('http')
const port = process.env.PORT || 8080

const server = http.createServer(function(req, res){
  res.end('Hello io.js')
})

server.listen(port, function(){
  console.log(`Server running in port ${port}`)
})
