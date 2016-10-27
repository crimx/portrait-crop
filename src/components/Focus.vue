<template>
  <div class="crop-box-focus"
  :style="{ left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px' }"></div>
</template>

<script>
export default {
  name: 'focus',
  props: ['cropBox'],
  data () {
    return {
      left: (this.cropBox.width - this.cropBox.minWidth) / 2,
      top: (this.cropBox.height - this.cropBox.minHeight) / 2,
      width: this.cropBox.minWidth,
      height: this.cropBox.minHeight,

      isMouseDown: false,
      oldMouseX: null,
      oldMouseY: null
    }
  },
  mounted () {
    ;[
      'mousedown',
      'touchstart',
      'pointerdown',
      'MSPointerDown'
    ].forEach((type) => {
      window.addEventListener(type, this.handleMouseDown)
    })
    ;[
      'mouseup',
      'touchend',
      'touchcancel',
      'pointerup',
      'pointercancel',
      'MSPointerUp',
      'MSPointerCancel'
    ].forEach((type) => {
      window.addEventListener(type, this.handleMouseUp)
    })
    ;[
      'mousemove',
      'touchmove',
      'pointermove',
      'MSPointerMove'
    ].forEach((type) => {
      window.addEventListener(type, this.handleMouseMove)
    })

    this.$on('crop-box-resized', function (wOffset, hOffset) {
      this.moveTo(this.left * wOffset, this.top * hOffset)
    })
  },
  methods: {
    handleMouseDown (evt) {
      if (evt.target !== this.$el) { return }
      evt.stopPropagation()
      evt.preventDefault()
      this.isMouseDown = true

      if (evt.touches) {
        this.oldMouseX = evt.touches[0].pageX
        this.oldMouseY = evt.touches[0].pageY
      } else {
        this.oldMouseX = evt.pageX
        this.oldMouseY = evt.pageY
      }
    },
    handleMouseUp (evt) {
      this.isMouseDown = false
    },
    handleMouseMove (evt) {
      if (!this.isMouseDown) { return }
      evt.stopPropagation()
      evt.preventDefault()

      var pageX = evt.pageX
      var pageY = evt.pageY
      if (evt.touches) {
        pageX = evt.touches[0].pageX
        pageY = evt.touches[0].pageY
      }
      this.moveTo(this.left + pageX - this.oldMouseX, this.top + pageY - this.oldMouseY)

      this.oldMouseX = pageX
      this.oldMouseY = pageY
    },
    moveTo (newLeft, newTop) {
      var cropBox = this.cropBox
      if (newTop < 0) {
        this.top = 0
      } else if (newTop + this.height > cropBox.height) {
        this.top = cropBox.height - this.height
      } else {
        this.top = newTop
      }
      if (newLeft < 0) {
        this.left = 0
      } else if (newLeft + this.width > cropBox.width) {
        this.left = cropBox.width - this.width
      } else {
        this.left = newLeft
      }

      this.emitChange()
    },
    emitChange () {
      this.$emit('focus-changed', {
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
      })
    }
  },
  watch: {
    'cropBox.left': function () {
      this.emitChange()
    },
    'cropBox.right': function () {
      this.emitChange()
    }
  }
}
</script>

<style>
.crop-box-focus {
  background: #f39c12;
  position: absolute;
  z-index: 99999;
  width: 40px;
  height: 40px;
  opacity: .5;
  cursor: move;
}
</style>
