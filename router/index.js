const path = require('path')
const course = require('course')
const st = require('st')
const router = course()
const jsonBody = require('body/json')

const mount = st({
  path: path.join(__dirname, '..', 'public'),
  index: 'index.html',
  passthrough: true
})

router.post('/process', function(req, res){
  jsonBody(req, res, { limit: 3 * 1024 * 1024 }, function(err, body){
    if (err) return fail(err, res)

    console.log(body)

    res.setHeader('Content-type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
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
