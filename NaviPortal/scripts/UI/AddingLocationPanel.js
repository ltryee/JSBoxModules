'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const Margin = Config.ui.margin
const LocationCache = require('scripts/Core/Cache.js')[Config.cache.locationKey]

let mapView = {
  type: 'map',
  props: {
    id: 'map',
  },
  layout: (make, view) => {
    make.left.right.top.equalTo(view.super).with.inset(Margin)
    make.height.equalTo(view.width)
  }
}

let pickerView = {
  type: 'picker',
  props: {
    id: 'coord_type',
    items: [['WGS84', 'GCJ02']],
  },
  layout: $layout.fill,
  events: {
    changed: (sender) => {
      $('coord').text = sender.data
    }
  }
}

let coordView = {
  type: 'label',
  props: {
    id: 'coord',
    text: 'WGS84',
    align: $align.center,

  },
  layout: $layout.fill
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
      let record = $('AddingLocationPanel').info
      let newLocation = {
        lng: Number($('lng').text),
        lat: Number($('lat').text),
        name: $('name').text,
        type: $('coord').text,
      }
      let newRecord = Object.assign({}, record, newLocation)

      LocationCache.set(newRecord)
      $ui.pop()
    }
  }
}

let getTextInbox = (identifier, kbType) => {
  return {
    type: 'input',
    props: {
      id: identifier,
      type: kbType,
    },
    layout: $layout.fill,
    events: {
      returned: (sender) => {
        sender.blur()
      }
    }
  }
}

let dataSource = [
  {
    rows: [mapView]
  },
  {
    title: '名称',
    rows: [getTextInbox('name', $kbType.default)]
  },
  {
    title: '经度',
    rows: [getTextInbox('lng', $kbType.decimal)]
  },
  {
    title: '纬度',
    rows: [getTextInbox('lat', $kbType.decimal)]
  },
  {
    title: '坐标类型',
    rows: [
      coordView, 
      // pickerView
    ]
  }
]

let view = {
  props: {
    id: 'AddingLocationPanel'
  },
  layout: $layout.fill,
  views: [{
    type: 'list',
    props: {
      id: 'AddingLocationPanelList',
      data: dataSource,
      footer: footer,
    },
    layout: $layout.fill,
    events: {
      rowHeight: (sender, indexPath) => {
        if (indexPath.section == 0) {
          return $device.info.screen.width
        }
        else if (indexPath.section == 4 && indexPath.row == 1) {
          return 80
        }
        else {
          return Config.ui.height
        }
      },
    }
  }],
}

module.exports = view