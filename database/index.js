'use strict'
const uuid = require('uuid')
const level = require('level')
const ttl = require('level-ttl')

module.exports = function(options){
  options = options || {}
  let duration = optiones.duration || 10 * 60 * 1000

  const db = ttl(level('./messages.db'), { checkFrequency: 10000 })

  function save(message, callback){
    let key = `message-${Date.now()}-${uuid.v4()}`
    let options = {
      valueEncoding: 'json',
      ttl: duration
    }

    db.put(key, message, options, callback)
  }

  function list(callback){
    callback()
  }

  return {
    save: save,
    list: list
  }
}
