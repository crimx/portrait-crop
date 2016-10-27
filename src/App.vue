<template>
  <div id="app">
    <header class="header">
      <a href="https://github.com/crimx/portrait-crop" target="_blank">
        <div class="container">
          <h1 class="title">Portrait Crop</h1>
          <p class="description">Crops images into portrait orientation and marks the focus as background-position</p>
        </div>
      </a>
    </header>
    <div class="container">
      <div class="row">
        <div class="canvas col-xs-12 col-sm-8">
          <div>
            <img id="image" src="./assets/background.png">
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
                <input type="number" class="form-control" placeholder="Cropped X" v-model="croppedArea.x" @input="changeCropBox('x', $event)">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">Y</div>
                <input type="number" class="form-control" placeholder="Cropped Y" v-model="croppedArea.y" @input="changeCropBox('y', $event)">
              </div>
            </div>
          </div> <!-- row -->
          <div class="row">
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">Width</div>
                <input type="number" class="form-control" placeholder="Cropped Width" v-model="croppedArea.width" @input="changeCropBox('width', $event)">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">Height</div>
                <input type="number" class="form-control" placeholder="Cropped Height" v-model="croppedArea.height" @input="changeCropBox('height', $event)">
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
          <div class="row">
            <div class="col-sm-12">
              <button type="button" class="btn btn-primary" @click="handleReset">Reset</button>
              <button type="button" class="btn btn-success" @click="handleCropAction">Crop</button>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <pre><code class="lang-css"><span class="hljs-class">.image-landscape</span> <span class="hljs-rules">{<br>  <span class="hljs-rule"><span class="hljs-attribute">background-size</span>:<span class="hljs-value"> cover</span></span>;<br>  <span class="hljs-rule"><span class="hljs-attribute">background-repeat</span>:<span class="hljs-value"> no-repeat</span></span>;<br>  <span class="hljs-rule"><span class="hljs-attribute">background-position</span>:<span class="hljs-value"> <span class="hljs-number">{{ bgPosition.landscapeLeft }}%</span> <span class="hljs-number">{{ bgPosition.landscapeTop }}%</span></span></span>;<br>}</span><br><br><span class="hljs-class">.image-portrait</span> <span class="hljs-rules">{<br>  <span class="hljs-rule"><span class="hljs-attribute">background-size</span>:<span class="hljs-value"> cover</span></span>;<br>  <span class="hljs-rule"><span class="hljs-attribute">background-repeat</span>:<span class="hljs-value"> no-repeat</span></span>;<br>  <span class="hljs-rule"><span class="hljs-attribute">background-position</span>:<span class="hljs-value"> <span class="hljs-number">{{ bgPosition.portraitLeft }}%</span> <span class="hljs-number">{{ bgPosition.portraitTop }}%</span></span></span>;<br>}</span><br></code></pre>
            </div>
          </div> <!-- row -->
        </div> <!-- sidebar -->
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
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        minWidth: 40,
        minHeight: 40
      },
      croppedArea: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      vmFocus: null,
      bgPosition: {
        landscapeLeft: 50,
        landscapeTop: 50,
        portraitLeft: 50,
        portraitTop: 50
      },
      isUrlInvalid: false,
      isCropping: false,
      aspectRatio: '9x16',
      saveType: 'png',
      fileName: 'Cropped'
    }
  },
  mounted () {
    var vm = this
    vm.cropper = new Cropper(document.getElementById('image'), {
      aspectRatio: 9 / 16,
      viewMode: 1, // the crop box should be within the canvas
      minContainerHeight: 400,
      minCropBoxWidth: vm.cropBox.minWidth,
      minCropBoxHeight: vm.cropBox.minHeight,
      ready () {
        vm.handleReset()
        // mount the focus point element
        let $Focus = Vue.extend(Focus)
        vm.vmFocus = new $Focus({
          propsData: {
            cropBox: vm.cropBox
          }
        })
        let $cropperCropBox = document.getElementsByClassName('cropper-crop-box')[0]
        $cropperCropBox.appendChild(vm.vmFocus.$mount().$el)

        // listen to child component
        vm.vmFocus.$on('focus-changed', function (fData) {
          var cData = vm.cropper.getCanvasData()
          var cropBox = vm.cropBox

          vm.bgPosition.landscapeLeft =
            ((cropBox.left - cData.left + fData.left + fData.width / 2) / cData.width * 100).toFixed(2)
          vm.bgPosition.landscapeTop =
            ((cropBox.top - cData.top + fData.top + fData.height / 2) / cData.height * 100).toFixed(2)

          vm.bgPosition.portraitLeft =
            ((fData.left + fData.width / 2) / cropBox.width * 100).toFixed(2)
          vm.bgPosition.portraitTop =
            ((fData.top + fData.height / 2) / cropBox.height * 100).toFixed(2)
        })

        vm.vmFocus.emitChange()
      },
      cropstart () {
        vm.isCropping = true
      },
      cropend () {
        vm.isCropping = false
      },
      crop (evt) {
        // when crop box changes
        if (vm.isCropping) {
          vm.updateCropperData()
        } // if not cropping, the data is written to the vm directly from input box
      }
    })
  },
  methods: {
    cropBoxFullHeight () {
      this.cropper.setCropBoxData({
        height: this.cropper.getCanvasData().height
      })
    },
    cropBoxCenter () {
      var cData = this.cropper.getCanvasData()
      var cboxData = this.cropper.getCropBoxData()
      this.cropper.setCropBoxData({
        left: (cData.width - cboxData.width) / 2
      })
    },
    updateCropperData () {
      var caData = this.cropper.getData()
      var cbData = this.cropper.getCropBoxData()

      var croppedArea = this.croppedArea
      croppedArea.x = caData.x
      croppedArea.y = caData.y
      croppedArea.width = caData.width
      croppedArea.height = caData.height

      var cropBox = this.cropBox
      var wOffset = cbData.width / cropBox.width
      var hOffset = cbData.height / cropBox.height
      if ((wOffset !== 1 || hOffset !== 1) && this.vmFocus) {
        this.vmFocus.$emit('crop-box-resized', wOffset, hOffset)
      }
      cropBox.left = cbData.left
      cropBox.top = cbData.top
      cropBox.width = cbData.width
      cropBox.height = cbData.height
    },
    changeCropBox (key, evt) {
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
          vm.handleReset()
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
          vm.handleReset()
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
      var oldCroppedAreaData = this.cropper.getData()
      this.aspectRatio = flag
      this.cropper.setAspectRatio(value)
      this.cropper.setData(oldCroppedAreaData)
      this.updateCropperData()
    },
    handleReset () {
      this.cropBoxFullHeight()
      this.cropBoxCenter()
      this.updateCropperData()
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
  background: #2ecc71;
  margin-bottom: 10px;
  &:hover {
    background: #27ae60;
  }

  a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: #fff;
      text-decoration: none;
    }
  }
}
  .title {
    font-size: 2.5em;
    margin: 0;
    text-shadow: 4px 3px 0 #27ae60;
  }

  .description {
    margin: 0;
    text-shadow: 4px 3px 0 #27ae60;
  }

#imagefile {
  display: none;
}

/* =================================== *\
   CODE BLOCK
\* =================================== */
pre code {
  color: #4d4e53;
}

.hljs-class {
  color: #690;
}

.hljs-attribute, .hljs-number {
  color: #905;
}

.hljs-number {
  color: #a67f59;
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
