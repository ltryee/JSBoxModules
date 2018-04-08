'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationDataSource = require('scripts/Core/LocationDataSource.js')

let getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    $location.fetch({
      handler: (resp) => {
        let lat = resp.lat
        let lng = resp.lng

        resolve({lat, lng})
      }
    })
  })
}

let addingLocationView = (location, title) => {
  let view = require('scripts/UI/AddLocationPanel.js')
  view.views[0].props.location = location
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
        let view = addingLocationView(location, '新的地点')
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
