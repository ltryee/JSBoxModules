'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationDataSource = require('scripts/Core/LocationDataSource.js')
const Utils = require('scripts/Core/Utils.js')

let getCurrentLocation = Utils.getCurrentLocation

let addingLocationView = (location) => {
  let view = require('scripts/UI/AddingLocationPanel.js')

  view.views[0].props.data[0].rows[0].props.location = location
  view.views[0].props.data[1].rows[0].props.text = '新的位置'
  view.views[0].props.data[2].rows[0].props.text = String(location.lng)
  view.views[0].props.data[3].rows[0].props.text = String(location.lat)

  return view
}

const AddingLocationButton = {
  type: 'label',
  props: {
    text: '添加',
    textColor: $color('tint'),
    align: $align.center
  },
  layout: $layout.fill,
  events: {
    tapped: (sender) => {
      getCurrentLocation().then((location) => {
        let view = addingLocationView(location)
        $ui.push(view)
      })
    }
  }
}

let locationData = LocationDataSource()
locationData.push(AddingLocationButton)

let dataSource = [
  {
    title: '地点',
    rows: locationData
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
    layout: $layout.fill,
    // events: {
    //   didSelect: (sender, indexPath, data) => {
    //     $console.info(sender)
    //     $console.info(indexPath)
    //     $console.info(data)
    //   }
    // }
  }]
}

module.exports = view
