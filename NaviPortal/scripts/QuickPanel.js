'use strict'

const Config = require('scripts/GlobalConfig.js')

let view = {
  props: {
    debugging: Config.debugging
  },
  views: [{
    type: 'label',
    props: {
      text: 'quick',
      align: $align.center
    },
    layout: $layout.fill,
  }]
}

module.exports = view
