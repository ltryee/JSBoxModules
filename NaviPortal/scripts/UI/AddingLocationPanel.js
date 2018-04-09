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
      let newLocation = {
        lng: Number($('lng').text),
        lat: Number($('lat').text),
        name: $('name').text
      }
      $console.info('newLocation')
      $console.info(newLocation)
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
    rows: [getTextInbox('lng', $kbType.decimal)]
  },
  {
    title: '纬度',
    rows: [getTextInbox('lat', $kbType.decimal)]
  },
]

let view = {
  props: {
    id: 'AddingLocationPanel'
  },
  layout: $layout.fill,
  views: [{
    type: 'list',
    props: {
      data: dataSource,
      footer: footer,
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