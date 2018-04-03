'use strict'

const DefaultOptions = {
  colunms: 1, // grid的列数
  margin: 5,  // grid的边距
  height: 40, // grid的高度
}

class GridViewLayout {
  constructor(options) {
    this._options = Object.assign({}, DefaultOptions, options)
    this._count = 0
  }

  layout(make, view, sequence = null) {
    let that = this

    let seq = sequence || that._count
    const ColNum = that._options.colunms
    const Margin = that._options.margin
    const Height = that._options.height

    let row = parseInt(seq / ColNum)
    let col = seq % ColNum
    let width = (view.super.frame.width - Margin * (ColNum + 1)) / ColNum
    let topInset = Margin + row * (Margin + Height)
    let leftInset = Margin + col * (Margin + width)

    make.top.equalTo(view.super).with.inset(topInset)
    make.left.equalTo(view.super).with.inset(leftInset)
    make.size.equalTo($size(width, Height))

    that._count += 1
  }
}

module.exports = GridViewLayout || {}