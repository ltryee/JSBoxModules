'use strict'

const Config = require('scripts/GlobalConfig.js')
const PathCache = require('scripts/Cache.js')[Config.cache.pathKey]
const LocationCache = require('scripts/Cache.js')[Config.cache.locationKey]

$console.info(`locations: ${JSON.stringify(LocationCache)}`)

let makeLocations = () => {
  let list = LocationCache.keys().map((item) => {
    return {
      label: {
        text: item
      }
    }
  }) || []

  list.push({
    type: 'label',
    props: {
      text: '添加',
      textColor: $color('tint'),
      align: $align.center
    },
    layout: $layout.fill,
    events: {
      tapped: (sender) => {
        // TODO: AddLocationPanel
      }
    }
  })

  return list
}

let dataSource = [
  {
    title: '地点',
    rows: makeLocations()
  },
  {
    title: '路线',
    rows: ["1-0", "1-1", "1-2"]
  }
]

let template = [
  {
    type: 'label',
    props: {
      id: 'label',
    },
    layout: $layout.fill
  }
]

let view = {
  props: {
    debugging: Config.debugging
  },
  views: [{
    type: 'list',
    props: {
      rowHeight: 44,
      data: dataSource,
      template: template
    },
    layout: $layout.fill
  }]
}

module.exports = view
