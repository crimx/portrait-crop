/* eslint-disable no-new */
/* global FileReader */
import Cropper from 'cropperjs'
import $ from 'zepto'
window.jQuery = $

// image src
require('../index.html')

require('bootstrap-sass/assets/javascripts/bootstrap/alert.js')
require('cropperjs/dist/cropper.min.css')
require('./scss/main.scss')

$(document).ready(function () {
  /* =================================== *\
     CROPPERJS
  \* =================================== */
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

  /* =================================== *\
     IMAGE UPLOAD
  \* =================================== */
  $('#imagefile').on('change', function (evt) {
    var file = evt.target.files[0]
    if (/^image\/\w+$/.test(file.type)) {
      let reader = new FileReader()
      reader.onload = function () {
        cropper.replace(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      window.alert('Please choose an image file.')
    }
  })

  /* =================================== *\
     IMAGE URL
  \* =================================== */
  var $wrapper = $('.url-input-wrapper')
  var delayApplyURL
  $('#imageurl').on('input', function (evt) {
    var url = evt.target.value
    if (evt.target.validity.valid && /\.(png|jpe?g)(\?.*)?$/i.test(url)) {
      clearTimeout(delayApplyURL)
      delayApplyURL = setTimeout(function () {
        $wrapper.removeClass('has-error')
        cropper.replace(url)
        $.ajax({
          url: url,
          error () {
            window.alert('Can not load this URL')
          }
        })
      }, 1000)
    } else {
      $wrapper.addClass('has-error')
    }
  })
})
