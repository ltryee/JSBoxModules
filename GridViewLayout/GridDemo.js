'use strict'

const GridViewLayout = require('GridViewLayout')

const count = 9
// const seq = Array.apply(null, {length: count}).map(Function.call, Number) // ES 5
const seq = Array.from(new Array(count), (val, index) => index) // ES 6
// console.log(seq)

let gridLayout = new GridViewLayout({
  colunms: 3,
  margin: 10,
  height: 44
})

$ui.render({
  layout: $layout.center,
  views: seq.map((item) => {
    return {
      type: 'label',
      props: {
        text: String(item),
        bgcolor: $color('tint'),
        textColor: $color("white"),
        align: $align.center,
        radius: 5
      },
      layout: (make, view) => {
        gridLayout.layout(make, view)
      }
    }
  })
})
