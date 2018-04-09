'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const Margin = Config.ui.margin
const LocationCache = require('scripts/Core/Cache.js')[Config.cache.locationKey]
const PathCache = require('scripts/Core/Cache.js')[Config.cache.pathKey]

let runtimeRecord = {}

let getPathMenu = (identifier) => {
  let locations = Object.values(LocationCache.get())
  locations.unshift({
    name: '我的位置',
    lat: 0,
    lng: 0,
    type: 'WGS84'
  })

  $ui.menu({
    items: locations.map((item) => {
      return item.name
    }),
    handler: (title, idx) => {
      let location = locations[idx]
      $(identifier).text = location.name
      runtimeRecord[identifier] = location
      $console.info(identifier)
      $console.info(runtimeRecord)
    }
  })
}

let getPathLabel = (identifier) => {
  return {
    type: 'label',
    props: {
      id: identifier,
      textColor: $color('tint'),
      bgcolor: $color('white'),
      align: $align.center
    },
    layout: $layout.fill,
    events: {
      tapped: (sender) => {
        getPathMenu(identifier)
      }
    }
  }
}

let footer = {
  type: 'label',
  props: {
    height: Config.ui.height,
    text: '保存',
    textColor: $color('white'),
    bgcolor: $color('tint'),
    align: $align.center
  },
  layout: (make, view) => {
    make.edges.equalTo(view.super).with.inset(Config.ui.margin)
  },
  events: {
    tapped: (sender) => {
      let record = $('AddingPathPanel').info
      let newRecord = Object.assign({}, record, runtimeRecord)

      PathCache.set(newRecord)
      $ui.pop()
    }
  }
}

let dataSource = [
  {
    title: '起点',
    rows: [
      getPathLabel('from'),
    ]
  },
  {
    title: '终点',
    rows: [
      getPathLabel('to'),
    ]
  }
]

let view = {
  props: {
    id: 'AddingPathPanel'
  },
  views: [{
    type: 'list',
    props: {
      id: 'AddingPathPanelList',
      data: dataSource,
      footer: footer
    },
    layout: $layout.fill,
    events: {
      rowHeight: (sender, indexPath) => {
        if (indexPath.row == 0) {
          return Config.ui.height 
        }
        else {
          return 100
        }
      }
    }
  }],
  layout: $layout.fill
}

module.exports = view