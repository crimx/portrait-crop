<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="title">Portrait Crop</h1>
        <p class="description">Crops images into portrait orientation and marks the focus as background-position</p>
      </div>
    </header>
    <div class="container">
      <div class="row">
        <div class="canvas col-xs-12 col-sm-8">
          <div>
            <img id="image" src="./assets/logo.png">
          </div>
        </div>
        <div class="sidebar col-xs-12 col-sm-4">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-inline" :class="{ 'has-error': isUrlInvalid }">
                <label type="button" class="btn btn-primary" for="imagefile">Upload File</label>
                <div class="form-group">
                  <input type="file" id="imagefile" accept=".png, .jpg, .jpeg" @change="handleFileUpload">
                  <input type="url" id="imageurl" class="form-control" placeholder="Or paste image URL here" @input="handleUrlInput">
                </div>
              </div>
            </div>
          </div>  <!-- row -->
          <div class="row">
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">X</div>
                <input type="number" class="form-control" placeholder="Cropped X" v-model="croppedArea.x" @input="updateCropBox('x', $event)">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">Y</div>
                <input type="number" class="form-control" placeholder="Cropped Y" v-model="croppedArea.y" @input="updateCropBox('y', $event)">
              </div>
            </div>
          </div> <!-- row -->
          <div class="row">
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">Width</div>
                <input type="number" class="form-control" placeholder="Cropped Width" v-model="croppedArea.width" @input="updateCropBox('width', $event)">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">Height</div>
                <input type="number" class="form-control" placeholder="Cropped Height" v-model="croppedArea.height" @input="updateCropBox('height', $event)">
              </div>
            </div>
          </div> <!-- row -->
          <div class="row">
            <div class="col-sm-12">
              <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary" :class="{ active: aspectRatio === '9x16' }" @click="handleAspectRatio(9/16, '9x16')">
                  <input type="radio" name="aspect-ratio-group" id="ratio9x16" autocomplete="off" v-model="aspectRatio" value="9x16"> 9:16
                </label>
                <label class="btn btn-primary" :class="{ active: aspectRatio === '3x4' }" @click="handleAspectRatio(3/4, '3x4')">
                  <input type="radio" name="aspect-ratio-group" id="ratio3x4" autocomplete="off" v-model="aspectRatio" value="3x4"> 3:4
                </label>
                <label class="btn btn-primary" :class="{ active: aspectRatio === '1x1' }" @click="handleAspectRatio(1, '1x1')">
                  <input type="radio" name="aspect-ratio-group" id="ratio1x1" autocomplete="off" v-model="aspectRatio" value="1x1"> 1:1
                </label>
                <label class="btn btn-primary" :class="{ active: aspectRatio === 'free' }" @click="handleAspectRatio(NaN, 'free')">
                  <input type="radio" name="aspect-ratio-group" id="ratio-free" autocomplete="off" v-model="aspectRatio" value="free"> Free
                </label>
              </div>

              <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary" :class="{ active: saveType === 'jpeg' }" @click="saveType = 'jpeg'">
                  <input type="radio" name="save-type-group" id="typejpg" autocomplete="off" v-model="aspectRatio" value="9x16"> JPG
                </label>
                <label class="btn btn-primary" :class="{ active: saveType === 'png' }" @click="saveType = 'png'">
                  <input type="radio" name="save-type-group" id="typepng" autocomplete="off" v-model="aspectRatio" value="9x16"> PNG
                </label>
              </div>
            </div>
          </div>  <!-- row -->
              <button type="button" class="btn btn-primary" @click="handleReset">Reset</button>
              <button type="button" class="btn btn-success" @click="handleCropAction">Crop</button>
        </div>
      </div> <!-- row -->
      <div class="row">
        <div class="output"></div>
      </div> <!-- row -->
    </div> <!-- container -->
  </div>
</template>

<script>
/* global FileReader XMLHttpRequest */
import Vue from 'vue'
import Focus from './components/Focus.vue'

import Cropper from 'cropperjs'
require('cropperjs/dist/cropper.min.css')

export default {
  name: 'app',
  components: {
    'focus': Focus
  },
  data () {
    return {
      cropper: null,
      cropBox: {
        minWidth: 40,
        minHeight: 40
      },
      croppedArea: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      isCropperReady: false,
      isUrlInvalid: false,
      isCropping: false,
      aspectRatio: '9x16',
      saveType: 'jpeg',
      fileName: 'Cropped'
    }
  },
  mounted () {
    var vm = this
    vm.cropper = new Cropper(document.getElementById('image'), {
      aspectRatio: 9 / 16,
      minContainerHeight: 400,
      minCropBoxWidth: vm.cropBox.minWidth,
      minCropBoxHeight: vm.cropBox.minHeight,
      ready () {
        vm.isCropperReady = true
        vm.cropBoxFullHeight()
        vm.updateCroppedArea(vm.cropper.getData())
        let $Focus = Vue.extend(Focus)
        let focus = new $Focus({
          propsData: {
            cropper: vm.cropper,
            width: vm.cropBox.minWidth,
            height: vm.cropBox.minHeight
          }
        })
        let $cropperCropBox = document.getElementsByClassName('cropper-crop-box')[0]
        $cropperCropBox.appendChild(focus.$mount().$el)
      },
      cropstart () {
        vm.isCropping = true
      },
      cropend () {
        vm.isCropping = false
      },
      crop (evt) {
        if (vm.isCropping) {
          vm.updateCroppedArea({
            x: evt.detail.x,
            y: evt.detail.y,
            width: evt.detail.width,
            height: evt.detail.height
          })
        }
      }
    })
  },
  methods: {
    cropBoxFullHeight () {
      this.cropper.setData({
        height: this.cropper.getContainerData().height
      })
    },
    updateCroppedArea (data) {
      var croppedArea = this.croppedArea
      croppedArea.x = data.x
      croppedArea.y = data.y
      croppedArea.width = data.width
      croppedArea.height = data.height
    },
    updateCropBox (key, evt) {
      if (evt.target.validity.valid) {
        let data = {}
        data[key] = +this.croppedArea[key]
        this.cropper.setData(data)
      }
    },
    handleFileUpload (evt) {
      var vm = this
      var file = evt.target.files[0]
      if (/^image\/\w+$/i.test(file.type)) {
        vm.saveType = /png/i.test(file.type) ? 'png' : 'jpeg'
        vm.fileName = file.name.split('.')[0]

        let reader = new FileReader()
        reader.onload = function () {
          vm.cropper.replace(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        window.alert('Please choose an image file.')
      }
    },
    handleUrlInput (evt) {
      var vm = this
      var url = evt.target.value
      if (evt.target.validity.valid && /\.(png|jpe?g)(\?|$)/i.test(url)) {
        let oReq = new XMLHttpRequest()
        oReq.open('GET', url)
        oReq.addEventListener('load', () => {
          vm.isUrlInvalid = false
          vm.cropper.replace(url)
          let s = /\/(.+?)\.png(\?|$)/i.exec(url)
          if (s) {
            vm.fileName = s[1]
            vm.saveType = 'png'
          } else {
            s = /\/(.+?)\./i.exec(url)
            vm.fileName = s[1]
            vm.saveType = 'jpeg'
          }
        })
        oReq.addEventListener('error', () => {
          vm.isUrlInvalid = true
          window.alert('Can not load this URL or image server blocks cross-domain image.')
        })
        oReq.send()
      } else {
        vm.isUrlInvalid = true
      }
    },
    handleAspectRatio (value, flag) {
      var oldBoxData = this.cropper.getData()
      this.aspectRatio = flag
      this.cropper.setAspectRatio(value)
      this.cropper.setData(oldBoxData)
      this.updateCroppedArea(oldBoxData)
    },
    handleReset () {
      this.cropper.reset()
      this.cropBoxFullHeight()
      this.updateCroppedArea(this.cropper.getData())
    },
    handleCropAction () {
      var a = document.createElement('a')
      a.href = this.cropper.getCroppedCanvas(this.saveType === 'png' ? null : {
        fillColor: '#fff'
      }).toDataURL('image/' + this.saveType)
      a.download = this.fileName
      a.click()
    }
  }
}

</script>

<style lang="scss">
@import './bootstrap-custom';

/* Limit image width to avoid overflow the container */
img {
  max-width: 100%;
}

/*remove gutter*/
.row {
  margin-bottom: 10px;
}

.header {
  padding: 10px;
  color: #fff;
  background: #2ecc71;
  margin-bottom: 10px;
}

  .title {
    margin: 0;
  }

#imagefile {
  display: none;
}

/* =================================== *\
   HELPER
\* =================================== */

.no-left-gutter {
  padding-left: 0;
}

.no-right-gutter {
  padding-right: 0;
}
</style>
