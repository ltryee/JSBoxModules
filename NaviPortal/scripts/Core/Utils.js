'use strict'

let getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    $location.fetch({
      handler: (resp) => {
        let lat = resp.lat
        let lng = resp.lng
        let name = '我的位置'

        resolve({
          lat,
          lng,
          name
        })
      }
    })
  })
}

module.exports = {
  getCurrentLocation,
}