'use strict'

const spawn = require('child_process').spawn
const os = require('os')
const path = require('path')

module.exports = function(options, callback){
  if(!options.baseName) return callback(new TypeError('You must specify a baseName'))

  let folder = options.folder || os.tmpDir()
  let baseName = options.baseName
  let fileSrc = path.join(folder, `${baseName}-%d.jpg`)
  let fileDest = path.join(folder, `${baseName}.webm`)

  let ffmpeg = spawn('ffmpeg', [
    '-i',
    fileSrc,
    '-filter:v',
    'setpts=2.5*PTS',
    '-vcodec',
    'libvpx',
    '-an',
    fileDest
   ])

   ffmpeg.stdout.on('close', function(code){
     if (!code) return callback(null)
     callback(new Error(`ffmpeg exited with code ${code}`))
   })
}
