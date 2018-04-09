'use strict'

const Config = require('scripts/Core/GlobalConfig.js').cache
const PathKey = Config.pathKey
const LocationKey = Config.locationKey

class CacheModule {
  constructor(identifier) {
    this._id = identifier
  }

  _load() {
    return $cache.get(this._id) || {}
  }

  _store(value) {
    $cache.set(this._id, value)
  }

  _generateID(key) {
    return $text.MD5(`${(new Date()).getTime()}${JSON.stringify(key)}`)
  }

  keys() {
    let rawData = this._load()
    return Object.keys(rawData)
  }

  get(key) {
    let rawData = this._load()
    return !!key ? rawData[key] : rawData
  }

  set(value) {
    let rawData = this._load()
    let _id = value._id || this._generateID(value)
    value._id = _id
    rawData[_id] = value
    this._store(rawData)
  }

  remove(key) {
    let rawData = this._load()
    if (key in rawData) {
      delete rawData[key]
      this._store(rawData)
    }
  }

  clear() {
    this._store({})
  }
}

let pathCache = new CacheModule(PathKey)
let locationCache = new CacheModule(LocationKey)
let caches = {}
caches[PathKey] = pathCache
caches[LocationKey] = locationCache

module.exports = caches