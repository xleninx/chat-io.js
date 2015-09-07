'use strict'
const path = require('path')
const course = require('course')
const st = require('st')
const router = course()
const jsonBody = require('body/json')
const helper = require('../helper')

const mount = st({
  path: path.join(__dirname, '..', 'public'),
  index: 'index.html',
  passthrough: true
})

router.post('/process', function(req, res){
  jsonBody(req, res, { limit: 3 * 1024 * 1024 }, function(err, body){
    if (err) return fail(err, res)

    if (Array.isArray(body.images)){
      let converter = helper.convertVideo(body.images)
      converter.on('video', function(video){
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify({ video: video }))
      })
    }else{
      res.statusCode = 500
      res.end(JSON.stringify({ error: 'parameter `images` is required'
    }


  })
})

function onRequest(req, res){
  mount(req, res, function(err){
    if (err) return fail(err, res)

    router(req, res, function(err){
      if (err) return fail(err, res)

      res.statusCode = 404
      res.end(`Not found ${req.url}`)
    })

  })
}

function fail(err, res){
  res.statusCode = 500
  res.setHeader('Content-type', 'text/plain')
  res.end(err.message)
}
module.exports = onRequest
