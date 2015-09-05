'use stric' // this is for make code clean with ES6

const http = require('http')
const port = process.env.PORT || 8080

const server = http.createServer()

server.listen(port)

console.log(`Server runing in port ${port}`)
