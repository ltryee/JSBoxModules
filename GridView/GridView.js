'use strict'

const DefaultOptions = {
  colunms: 1, // cell的列数
  margin: 5,  // cell的边距
  height: 40, // cell的高度
}

/**
 * 生成网格view对象
 * @param   {?String}     identifier        view的id
 * @param   {?Dictionary} options           view的配置项
 * @param   {?Number}     options.colunms   cell列数
 * @param   {?Number}     options.height    cell高度
 * @param   {?Number}     options.margin    cell间距
 * @param   {!Array}      dataList          数据
 * @param   {!Function}   didSelectCallback 点击事件回调
 * @returns {Object}      网格view对象
 */
let maker = (identifier, options, dataList, didSelectCallback) => {
  var theOptions = Object.assign({}, DefaultOptions, options)
  let objID = identifier || 'matrix'
  $console.info(`theOptions: ${Object.keys(theOptions)}, ${theOptions.columns}`)

  let dataSource = dataList.map((item, index) => {
    return {
      tile: {
        text: '' + (item.name || item.title || item.id || item),
        info: item
      }
    }
  })

  let template = [{
    type: 'label',
    props: {
      id: 'tile',
      align: $align.center,
      bgcolor: $color('tint'),
      textColor: $color('white'),
      radius: theOptions.margin,
    },
    layout: $layout.fill
  }]

  let matrix = {
    type: "matrix",
    props: {
      id: objID,
      columns: theOptions.colunms,
      itemHeight: theOptions.height,
      spacing: theOptions.margin,
      template: template,
      data: dataSource
    },
    layout: $layout.fill,
    events: {
      didSelect: function (sender, indexPath, data) {
        didSelectCallback(sender, indexPath, data.tile.info)
      }
    }
  }

  return matrix
}

module.exports = maker