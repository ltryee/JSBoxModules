'use strict'

const AccessToken = 'G9Scem5gagnwBURpymebWnPHkM8t6UGy'

/**
 * 将GPS获取的坐标(WGS84)转换为百度经纬度坐标(BD09LL)
 * 
 * @param {!Array<Object>}  locations         坐标数组
 * @param {!Number}         locations[0].lng  WGS84坐标经度
 * @param {!Number}         locations[0].lat  WGS84坐标纬度
 * @param {!Function}       callback          回调函数，接受error和locations两个参数，其中
 *                                            - error 表示错误信息，格式参考 https://docs.xteko.com/#/object/error
 *                                            - locations 表示转换后的坐标，只修改传入参数中的lat和lng，如果带有其他数据，则原样传出
 */
let WGS84_2_BD09LL = (locations, callback) => {
  let coords = locations.map((location) => {
    return `${location.lng},${location.lat}`
  }).join(';')

  $http.get({
    url: `http://api.map.baidu.com/geoconv/v1/?coords=${coords}&from=1&to=5&ak=${AccessToken}`,
    handler: (resp) => {
      let res = resp.data

      if (resp.error) {
        callback(resp.error, null)
      }
      else if (res.status) {
        callback({
          code: res.status,
          domain: '百度地图JSAPI错误',
          userInfo: '参考 http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition'
        }, null)
      }
      else {
        res.result.forEach((convertedLocation, index) => {
          locations[index].lng = convertedLocation.x
          locations[index].lat = convertedLocation.y
        })
        callback(null, locations)
      }
    }
  })
}

const Page = `
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  <style type="text/css">
    body,
    html,
    #allmap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0;
      font-family: "微软雅黑";
    }
  </style>
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=${AccessToken}"></script>
  <title>地图展示</title>
</head>

<body>
  <div id="allmap"></div>
</body>

</html>
<script type="text/javascript">
  var MapInstance = new BMap.Map("allmap"); // 创建Map实例
</script>
`
const DefaultProps = {
  toolbar: false,
  showsProgress: false,
  html: Page,
}

class MapViewDescriptor {
  constructor(identifier, jsHandler) {
    this._identifier = identifier || `BaiduMapView_${(new Date()).getTime()}`
    this._layout = $layout.fill
    this._props = null
    this._jsHandler = jsHandler
  }

  _debugLog(result, error) {
    $console.info('debug log begin:')
    $console.info('error:')
    $console.info(error || 'null')
    $console.info('result:')
    $console.info(result || 'null')
    $console.info($props(result))
    if (result) {
      $console.info(`${result.domain}, ${result.code}, ${JSON.stringify(result.userInfo, null, 4)}`)
    }
    $console.info('debug log end')
  }

  _runScript(script, handler) {
    $(this._identifier).eval({
      script,
      handler
    })
  }

  _runScriptPromised(script) {
    let that = this

    return new Promise((resolve, reject) => {
      $(that._identifier).eval({
        script: script,
        handler: (result, error) => {
          if (error) {
            reject(error)
          }
          else if (!!result && 'domain' in result && 'code' in result) {
            reject({
              code: result.code,
              domain: result.domain,
              userInfo: result.userInfo || ''
            })
          }
          else {
            resolve(result)
          }
        }
      })
    })
  }

  _onInit(handler) {
    this._runScript(`
      MapInstance.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
      MapInstance.setCurrentCity("北京")
      $notify('onLogging', {'msg': 'Inner initialization done.'})
    `, handler)
  }

  assignLocation(initialPoint, runtimeHandler, jsHandler) {
    this._runScript(`
      let point = new BMap.Point(${initialPoint.lng}, ${initialPoint.lat})
      let marker = new BMap.Marker(point)
      marker.addEventListener("click",attribute)
      MapInstance.addOverlay(marker)    //增加点
      marker.enableDragging()
      marker.addEventListener("dragend",attribute)
      marker.addEventListener("dragging",attribute)
      function attribute() {
        var p = marker.getPosition()  //获取marker的位置
        // $notify('onLogging', {'msg': 'now location', 'lng': p.lng, 'lat': p.lat})
        $notify('onAssigningLocation', {'lng': p.lng, 'lat': p.lat})
      }
    `, runtimeHandler)
  }

  assignRoute(beginLocation, endLocation, runtimeHandler) {
    this._runScript(`
      let beginPoint = new BMap.Point(${beginLocation.lng}, ${beginLocation.lat})
      let endPoint = new BMap.Point(${endLocation.lng}, ${endLocation.lat})
      let driving = new BMap.DrivingRoute(MapInstance, {
        renderOptions: {
          map: MapInstance, 
          autoViewport: true
        }
      })
      driving.search(beginPoint, endPoint)
    `, runtimeHandler)
  }

  setProps(props) {
    this._props = props
  }

  setLayout(layout) {
    this._layout = layout
  }

  view() {
    let that = this

    return {
      type: 'web',
      props: Object.assign({id: that._identifier}, DefaultProps, that._props),
      layout: that._layout,
      events: {
        onLogging: (object) => {
          $console.info('Inner log: ' + JSON.stringify(object))
          // $console.info(JSON.stringify(object, null, 4))
        },
        onAssigningLocation: (object) => {
          $ui.toast(`${object.lng}, ${object.lat}`)
          if (this._jsHandler) {
            this._jsHandler('onAssigningLocation', object)
          }
        },
        didFinish: (sender, navigation) => {
          that._onInit((result, error) => {
            that._debugLog(result, error)

            // that.assignLocation({
            //   lng: 116.301592,
            //   lat: 39.982896
            // }, that._debugLog)

            that.assignRoute({
              lng: 116.301592, 
              lat: 39.982896
            }, {
              lng: 117.830066, 
              lat: 39.327633
            }, that._debugLog)
          })
        }
      }
    }
  }
}

MapViewDescriptor.WGS84_2_BD09LL = WGS84_2_BD09LL

module.exports = MapViewDescriptor || {}

{
  let descriptor = new MapViewDescriptor()
  $ui.render({
    props: {
      debugging: true,
    },
    views: [descriptor.view()]
  })

  MapViewDescriptor.WGS84_2_BD09LL([{
    lng: 116.434303,
    lat: 39.913474
  }, {
    lng: 116.384575,
    lat: 39.884632,
    name: '友谊医院'
  },], (error, res) => {
    if (error) {
      $console.error(error)
    }
    $console.info('WGS84_2_BD09LL')
    $console.info(res || null)
  })
}