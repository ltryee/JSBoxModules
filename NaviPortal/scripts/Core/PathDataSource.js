'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const PathCache = require('scripts/Core/Cache.js')[Config.cache.pathKey]

let makeData = () => {
	let list = PathCache.keys().map((item) => {
	  let record = PathCache.get(item)
	  return {
		label: {
		  text: `${record.from.name} -> ${record.to.name}`,
		},
		record: record
	  }
	}) || []
  
	return list
  }
  
  module.exports = makeData