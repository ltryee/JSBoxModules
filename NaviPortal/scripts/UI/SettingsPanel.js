'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationDataSource = require('scripts/Core/LocationDataSource.js')
const PathDataSource = require('scripts/Core/PathDataSource.js')
const Utils = require('scripts/Core/Utils.js')

let getCurrentLocation = Utils.getCurrentLocation

let addingLocationView = (location) => {
  let view = require('scripts/UI/AddingLocationPanel.js')

  view.views[0].props.data[0].rows[0].props.location = {
    lat: location.lat,
    lng: location.lng,
  }
  view.views[0].props.data[1].rows[0].props.text = location.name
  view.views[0].props.data[2].rows[0].props.text = String(location.lng)
  view.views[0].props.data[3].rows[0].props.text = String(location.lat)
  view.props.info = location

  return view
}

const AddingLocationButton = {
  type: 'label',
  props: {
    text: '添加新位置',
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

let addingPathView = (path) => {
  let view = require('scripts/UI/AddingPathPanel.js')

  view.props.info = path || {}
  if (path) {
    view.views[0].props.data[0].rows[0].props.text = path.from.name
    view.views[0].props.data[1].rows[0].props.text = path.to.name
  }

  return view
}

const AddingPathButton = {
  type: 'label',
  props: {
    text: '添加新路线',
    textColor: $color('tint'),
    align: $align.center
  },
  layout: $layout.fill,
  events: {
    tapped: (sender) => {
      let view = addingPathView(null)
      $console.info(JSON.stringify(view))
      $ui.push(view)
    }
  }
}

let locationData = LocationDataSource()
locationData.push(AddingLocationButton)

let pathData = PathDataSource()
pathData.push(AddingPathButton)

let dataSource = [
  {
    title: '位置',
    rows: locationData
  },
  {
    title: '路线',
    rows: pathData
  }
]

let template = [
  {
    type: 'label',
    props: {
      id: 'label',
    },
    layout: (make, view) => {
      make.left.right.equalTo(15)
      make.height.equalTo(view.super)
    }
  }
]

let view = {
  props: {
    debugging: Config.debugging
  },
  views: [{
    type: 'list',
    props: {
      id: 'settingsList',
      rowHeight: 44,
      data: dataSource,
      template: template
    },
    layout: $layout.fill,
    events: {
      didSelect: (sender, indexPath, data) => {
        if (indexPath.section == 0) {
          let location = sender.object(indexPath).record
          let view = addingLocationView(location)
          $ui.push(view)
        }

        if (indexPath.section == 1) {
          let path = sender.object(indexPath).record
          let view = addingPathView(path)
          $ui.push(view)
        }
        
      }
    }
  }]
}

module.exports = view
