'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationCache = require('scripts/Core/Cache.js')[Config.cache.locationKey]

let makeData = () => {
  let list = LocationCache.keys().map((item) => {
    return {
      label: {
        text: item,
        location: LocationCache.get(item)
      }
    }
  }) || []

  return list
}

module.exports = makeData