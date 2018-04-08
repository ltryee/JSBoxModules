'use strict'

const Config = require('scripts/Core/GlobalConfig.js')
const LocationCache = require('scripts/Core/Cache.js')[Config.cache.locationKey]

const AddLocationView = () => {
  let view = require('scripts/AddLocationPanel.js')
  $console.info(view)

  return new Promise((resolve, reject) => {
    $location.fetch({
      handler: (resp) => {
        let lat = resp.lat
        let lng = resp.lng

        resolve({lat, lng})
      }
    })
  })
  .then((location) => {
    view.views[0].props.location = location
    $console.info(location)
    $console.info(JSON.stringify(view))
    return view
  })
}

let makeData = () => {
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
        AddLocationView().then((view) => {
          $ui.push(view)
        })
      }
    }
  })

  return list
}

module.exports = makeData