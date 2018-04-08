'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationDataSource = require('scripts/Core/LocationDataSource.js')

let dataSource = [
  {
    title: '地点',
    rows: LocationDataSource()
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
