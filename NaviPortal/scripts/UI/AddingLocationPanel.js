'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const Margin = Config.ui.margin

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

let getTextInbox = (identifier, kbType) => {
  return {
    type: 'input',
    props: {
      id: identifier,
      type: kbType,
      clearsOnBeginEditing: true,
    },
    layout: $layout.fill
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
    rows: [getTextInbox('lng', $kbType.number)]
  },
  {
    title: '纬度',
    rows: [getTextInbox('lat', $kbType.number)]
  },
]

let view = {
  props: {
    id: 'AddLocationPanel'
  },
  layout: $layout.fill,
  views: [{
    type: 'list',
    props: {
      data: dataSource
    },
    layout: $layout.fill,
    events: {
      rowHeight: (sender, indexPath) => {
        if (indexPath.section == 0) {
          return $device.info.screen.width
        }
        else {
          return Config.ui.height
        }
      }
    }
  }],
}

module.exports = view