'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationCache = require('scripts/Core/Cache.js')[Config.cache.locationKey]

let makeData = () => {
  let list = LocationCache.keys().map((item) => {
    let record = LocationCache.get(item)
    return {
      label: {
        text: record.name,
      },
      record: record
    }
  }) || []

  return list
}

module.exports = makeData