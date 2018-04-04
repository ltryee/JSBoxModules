'use strict'

const GridViewMaker = require('GridView')

const count = 9
const seq = Array.from(new Array(count), (val, index) => index) // ES 6

let gridView = GridViewMaker('GridViewDemo_main', {
  colunms: 3
}, seq, (sender, indexPath, data) => {
  $alert(`you just clicked ${data}`)
})

$ui.render({
  layout: $layout.center,
  views: [gridView]
})
