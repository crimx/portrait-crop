/* eslint-disable no-new */
import Cropper from 'cropperjs'
import $ from 'zepto'

// image src
require('../index.html')

require('cropperjs/dist/cropper.min.css')
require('./scss/main.scss')

console.log($('#image'))

$(document).ready(function () {
  var cropper = new Cropper($('#image')[0], {
    aspectRatio: 9 / 16,
    viewMode: 2,
    minContainerHeight: 400,
    ready () {
      cropper.setCropBoxData({
        height: cropper.getContainerData().height
      })
    },
    crop (e) {
      // console.log(e.detail.x)
      // console.log(e.detail.y)
      // console.log(e.detail.width)
      // console.log(e.detail.height)
      // console.log(e.detail.rotate)
      // console.log(e.detail.scaleX)
      // console.log(e.detail.scaleY)
    }
  })
})
