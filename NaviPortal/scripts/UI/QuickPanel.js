'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const GridViewMaker = require('scripts/UI/GridView.js')
const PathCache = require('scripts/Core/Cache.js')[Config.cache.pathKey]

let dataList = Object.values(PathCache.get()).map((item) => {
  return Object.assign({}, item, {
    name: `${item.from.name}->${item.to.name}`
  })
})

let gridView = GridViewMaker('QuickPanel', {colunms: 2}, dataList, (sender, indexPath, path) => {
  let URL = `baidumap://map/direction?origin=name:${$text.URLEncode(path.from.name)}|latlng:${path.from.lat},${path.from.lng}&destination=latlng:${path.to.lat},${path.to.lng}|name:${$text.URLEncode(path.to.name)}&mode=driving&coord_type=wgs84`
  $app.openURL(URL)
})

let view = {
  props: {
    debugging: Config.debugging
  },
  views: [gridView]
}

module.exports = view
