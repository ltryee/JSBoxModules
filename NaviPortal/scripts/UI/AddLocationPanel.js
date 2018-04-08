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

let view = {
  props: {
    id: 'AddLocationPanel'
  },
  layout: $layout.fill,
  views: [
    mapView,
  ]
}

module.exports = view