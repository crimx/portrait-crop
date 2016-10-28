webpackJsonp([1,0],[function(A,t,e){"use strict";function i(A){return A&&A.__esModule?A:{"default":A}}var a=e(1),s=i(a),o=e(10),n=i(o);new s["default"]({el:"#app",render:function(A){return A(n["default"])}})},,function(A,t,e){"use strict";function i(A){return A&&A.__esModule?A:{"default":A}}Object.defineProperty(t,"__esModule",{value:!0});var a=e(1),s=i(a),o=e(11),n=i(o),r=e(4),g=i(r);e(6),t["default"]={name:"app",components:{focus:n["default"]},data:function(){return{cropper:null,cropBox:{left:0,top:0,width:0,height:0,minWidth:40,minHeight:40},croppedArea:{x:0,y:0,width:0,height:0},vmFocus:null,bgPosition:{landscapeLeft:50,landscapeTop:50,portraitLeft:50,portraitTop:50},isUrlInvalid:!1,isCropping:!1,isDragging:!1,aspectRatio:"9x16",saveType:"png",fileName:"Cropped"}},mounted:function(){var A=this;A.cropper=new g["default"](document.getElementById("image"),{aspectRatio:9/16,viewMode:1,minContainerHeight:400,minCropBoxWidth:A.cropBox.minWidth,minCropBoxHeight:A.cropBox.minHeight,ready:function(){A.handleReset();var t=s["default"].extend(n["default"]);A.vmFocus=new t({propsData:{cropBox:A.cropBox}});var e=document.getElementsByClassName("cropper-crop-box")[0];e.appendChild(A.vmFocus.$mount().$el),A.vmFocus.$on("focus-changed",function(t){var e=A.cropper.getCanvasData(),i=A.cropBox;A.bgPosition.landscapeLeft=((i.left-e.left+t.left+t.width/2)/e.width*100).toFixed(2),A.bgPosition.landscapeTop=((i.top-e.top+t.top+t.height/2)/e.height*100).toFixed(2),A.bgPosition.portraitLeft=((t.left+t.width/2)/i.width*100).toFixed(2),A.bgPosition.portraitTop=((t.top+t.height/2)/i.height*100).toFixed(2)}),A.vmFocus.emitChange()},cropstart:function(){A.isCropping=!0},cropend:function(){A.isCropping=!1},crop:function(t){A.isCropping&&A.updateCropperData(),A.cropper.getCropBoxData().width<A.cropBox.minWidth&&A.cropper.setCropBoxData({width:A.cropBox.minWidth})}}),e(5);var t=new Dragster(document);document.addEventListener("dragster:enter",function(t){A.isDragging=!0}),document.addEventListener("dragster:leave",function(t){A.isDragging=!1}),["drag","dragend","dragenter","dragexit","dragleave","dragover","dragstart","drop"].forEach(function(A){document.addEventListener(A,function(A){A.stopPropagation(),A.preventDefault()})}),document.addEventListener("drop",function(e){e.dataTransfer.files.length>0&&A.readImageFile(e.dataTransfer.files[0]),A.isDragging=!1,t.reset()})},methods:{cropBoxFullHeight:function(){this.cropper.setCropBoxData({height:this.cropper.getCanvasData().height})},cropBoxCenter:function(){var A=this.cropper.getCanvasData(),t=this.cropper.getCropBoxData();this.cropper.setCropBoxData({left:(A.width-t.width)/2})},updateCropperData:function(){var A=this.cropper.getData(),t=this.cropper.getCropBoxData(),e=this.croppedArea;e.x=A.x,e.y=A.y,e.width=A.width,e.height=A.height;var i=this.cropBox,a=t.width/i.width,s=t.height/i.height;1===a&&1===s||!this.vmFocus||this.vmFocus.$emit("crop-box-resized",a,s),i.left=t.left,i.top=t.top,i.width=t.width,i.height=t.height},changeCropBox:function(A,t){if(t.target.validity.valid){var e={};e[A]=+this.croppedArea[A],this.cropper.setData(e)}},readImageFile:function(A){var t=this;/^image\/\w+$/i.test(A.type)?!function(){t.saveType=/png/i.test(A.type)?"png":"jpeg",t.fileName=A.name.split(".")[0]+"-cropped";var e=new FileReader;e.onload=function(){t.cropper.replace(e.result),t.handleReset()},e.readAsDataURL(A)}():window.alert("Please choose a jpg/png iamge file.")},handleFileUpload:function(A){A.target.files.length>0&&this.readImageFile(A.target.files[0])},handleUrlInput:function(A){var t=this,e=A.target.value;if(A.target.validity.valid&&/\.(png|jpe?g)(\?|$)/i.test(e)){var i=new XMLHttpRequest;i.open("GET",e),i.addEventListener("load",function(){t.isUrlInvalid=!1,t.cropper.replace(e),t.handleReset();var A=/\/(.+?)\.png(\?|$)/i.exec(e);A?(t.fileName=A[1],t.saveType="png"):(A=/\/(.+?)\./i.exec(e),t.fileName=A[1],t.saveType="jpeg")}),i.addEventListener("error",function(){t.isUrlInvalid=!0,window.alert("Can not load this URL or image server blocks cross-domain image.")}),i.send()}else t.isUrlInvalid=!0},handleAspectRatio:function(A,t){var e=this.cropper.getData();this.aspectRatio=t,this.cropper.setAspectRatio(A),this.cropper.setData(e),this.updateCropperData()},handleReset:function(){this.cropBoxFullHeight(),this.cropBoxCenter(),this.updateCropperData()},handleCropAction:function(){var A=document.createElement("a");A.href=this.cropper.getCroppedCanvas("png"===this.saveType?null:{fillColor:"#fff"}).toDataURL("image/"+this.saveType),A.download=this.fileName,A.click()}}}},function(A,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={name:"focus",props:["cropBox"],data:function(){return{left:this.cropBox.width/3-this.cropBox.minWidth/2,top:this.cropBox.height/3-this.cropBox.minHeight/2,width:this.cropBox.minWidth,height:this.cropBox.minHeight,isMouseDown:!1,oldMouseX:null,oldMouseY:null}},mounted:function(){var A=this;["mousedown","touchstart","pointerdown","MSPointerDown"].forEach(function(t){window.addEventListener(t,A.handleMouseDown)}),["mouseup","touchend","touchcancel","pointerup","pointercancel","MSPointerUp","MSPointerCancel"].forEach(function(t){window.addEventListener(t,A.handleMouseUp)}),["mousemove","touchmove","pointermove","MSPointerMove"].forEach(function(t){window.addEventListener(t,A.handleMouseMove)}),this.$on("crop-box-resized",function(A,t){this.moveTo(this.left*A,this.top*t)})},methods:{handleMouseDown:function(A){A.target===this.$el&&(A.stopPropagation(),A.preventDefault(),this.isMouseDown=!0,A.touches?(this.oldMouseX=A.touches[0].pageX,this.oldMouseY=A.touches[0].pageY):(this.oldMouseX=A.pageX,this.oldMouseY=A.pageY))},handleMouseUp:function(A){this.isMouseDown=!1},handleMouseMove:function(A){if(this.isMouseDown){A.stopPropagation(),A.preventDefault();var t=A.pageX,e=A.pageY;A.touches&&(t=A.touches[0].pageX,e=A.touches[0].pageY),this.moveTo(this.left+t-this.oldMouseX,this.top+e-this.oldMouseY),this.oldMouseX=t,this.oldMouseY=e}},moveTo:function(A,t){var e=this.cropBox;t<0?this.top=0:t+this.height>e.height?this.top=e.height-this.height:this.top=t,A<0?this.left=0:A+this.width>e.width?this.left=e.width-this.width:this.left=A,this.emitChange()},emitChange:function(){this.$emit("focus-changed",{left:this.left,top:this.top,width:this.width,height:this.height})}},watch:{"cropBox.left":function(){this.emitChange()},"cropBox.right":function(){this.emitChange()}}}},,,function(A,t){},function(A,t){},function(A,t){},function(A,t){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAALQCAYAAADPfd1WAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABSESURBVHja7NhBEQAgAMMwwL/n4aOXSOizd9sBAAAAAJqeBAAAAADQZQACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYQYgAAAAAIQZgAAAAAAQZgACAAAAQJgBCAAAAABhBiAAAAAAhBmAAAAAABBmAAIAAABAmAEIAAAAAGEGIAAAAACEGYAAAAAAEGYAAgAAAECYAQgAAAAAYR8AAP//AwDxIAidsyWMFwAAAABJRU5ErkJggg=="},function(A,t,e){var i,a;e(8),i=e(2);var s=e(13);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,A.exports=i},function(A,t,e){var i,a;e(7),i=e(3);var s=e(12);a=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(a=i=i["default"]),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,A.exports=i},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"crop-box-focus",style:{left:left+"px",top:top+"px",width:width+"px",height:height+"px"}})},staticRenderFns:[]}},function(module,exports,__webpack_require__){module.exports={render:function(){with(this)return _h("div",{attrs:{id:"app"}},[_m(0)," ",_h("div",{staticClass:"container"},[_h("div",{staticClass:"row"},[_m(1)," ",_h("div",{staticClass:"sidebar col-xs-12 col-sm-4"},[_h("div",{staticClass:"row"},[_h("div",{staticClass:"col-sm-12"},[_h("div",{staticClass:"form-inline","class":{"has-error":isUrlInvalid}},[_m(2)," ",_h("div",{staticClass:"form-group"},[_h("input",{attrs:{type:"file",id:"imagefile",accept:".png, .jpg, .jpeg"},on:{change:handleFileUpload}})," ",_h("input",{staticClass:"form-control",attrs:{type:"url",id:"imageurl",placeholder:"Paste image URL or drag file here"},on:{input:handleUrlInput}})])])])])," "," ",_h("div",{staticClass:"row"},[_h("div",{staticClass:"col-sm-6"},[_h("div",{staticClass:"input-group"},[_m(3)," ",_h("input",{directives:[{name:"model",rawName:"v-model",value:croppedArea.x,expression:"croppedArea.x"}],staticClass:"form-control",attrs:{type:"number",placeholder:"Cropped X"},domProps:{value:_s(croppedArea.x)},on:{input:[function(A){A.target.composing||(croppedArea.x=_n(A.target.value))},function(A){changeCropBox("x",A)}]}})])])," ",_h("div",{staticClass:"col-sm-6"},[_h("div",{staticClass:"input-group"},[_m(4)," ",_h("input",{directives:[{name:"model",rawName:"v-model",value:croppedArea.y,expression:"croppedArea.y"}],staticClass:"form-control",attrs:{type:"number",placeholder:"Cropped Y"},domProps:{value:_s(croppedArea.y)},on:{input:[function(A){A.target.composing||(croppedArea.y=_n(A.target.value))},function(A){changeCropBox("y",A)}]}})])])])," "," ",_h("div",{staticClass:"row"},[_h("div",{staticClass:"col-sm-6"},[_h("div",{staticClass:"input-group"},[_m(5)," ",_h("input",{directives:[{name:"model",rawName:"v-model",value:croppedArea.width,expression:"croppedArea.width"}],staticClass:"form-control",attrs:{type:"number",placeholder:"Cropped Width"},domProps:{value:_s(croppedArea.width)},on:{input:[function(A){A.target.composing||(croppedArea.width=_n(A.target.value))},function(A){changeCropBox("width",A)}]}})])])," ",_h("div",{staticClass:"col-sm-6"},[_h("div",{staticClass:"input-group"},[_m(6)," ",_h("input",{directives:[{name:"model",rawName:"v-model",value:croppedArea.height,expression:"croppedArea.height"}],staticClass:"form-control",attrs:{type:"number",placeholder:"Cropped Height"},domProps:{value:_s(croppedArea.height)},on:{input:[function(A){A.target.composing||(croppedArea.height=_n(A.target.value))},function(A){changeCropBox("height",A)}]}})])])])," "," ",_h("div",{staticClass:"row"},[_h("div",{staticClass:"col-sm-12"},[_h("div",{staticClass:"btn-group",attrs:{"data-toggle":"buttons"}},[_h("label",{staticClass:"btn btn-primary","class":{active:"9x16"===aspectRatio},on:{click:function(A){handleAspectRatio(9/16,"9x16")}}},[_h("input",{directives:[{name:"model",rawName:"v-model",value:aspectRatio,expression:"aspectRatio"}],attrs:{type:"radio",name:"aspect-ratio-group",id:"ratio9x16",autocomplete:"off",value:"9x16"},domProps:{checked:_q(aspectRatio,"9x16")},on:{change:function(A){aspectRatio="9x16"}}})," 9:16\n              "])," ",_h("label",{staticClass:"btn btn-primary","class":{active:"3x4"===aspectRatio},on:{click:function(A){handleAspectRatio(.75,"3x4")}}},[_h("input",{directives:[{name:"model",rawName:"v-model",value:aspectRatio,expression:"aspectRatio"}],attrs:{type:"radio",name:"aspect-ratio-group",id:"ratio3x4",autocomplete:"off",value:"3x4"},domProps:{checked:_q(aspectRatio,"3x4")},on:{change:function(A){aspectRatio="3x4"}}})," 3:4\n              "])," ",_h("label",{staticClass:"btn btn-primary","class":{active:"1x1"===aspectRatio},on:{click:function(A){handleAspectRatio(1,"1x1")}}},[_h("input",{directives:[{name:"model",rawName:"v-model",value:aspectRatio,expression:"aspectRatio"}],attrs:{type:"radio",name:"aspect-ratio-group",id:"ratio1x1",autocomplete:"off",value:"1x1"},domProps:{checked:_q(aspectRatio,"1x1")},on:{change:function(A){aspectRatio="1x1"}}})," 1:1\n              "])," ",_h("label",{staticClass:"btn btn-primary","class":{active:"free"===aspectRatio},on:{click:function(A){handleAspectRatio(NaN,"free")}}},[_h("input",{directives:[{name:"model",rawName:"v-model",value:aspectRatio,expression:"aspectRatio"}],attrs:{type:"radio",name:"aspect-ratio-group",id:"ratio-free",autocomplete:"off",value:"free"},domProps:{checked:_q(aspectRatio,"free")},on:{change:function(A){aspectRatio="free"}}})," Free\n              "])])," ",_h("div",{staticClass:"btn-group",attrs:{"data-toggle":"buttons"}},[_h("label",{staticClass:"btn btn-primary","class":{active:"jpeg"===saveType},on:{click:function(A){saveType="jpeg"}}},[_h("input",{directives:[{name:"model",rawName:"v-model",value:aspectRatio,expression:"aspectRatio"}],attrs:{type:"radio",name:"save-type-group",id:"typejpg",autocomplete:"off",value:"9x16"},domProps:{checked:_q(aspectRatio,"9x16")},on:{change:function(A){aspectRatio="9x16"}}})," JPG\n              "])," ",_h("label",{staticClass:"btn btn-primary","class":{active:"png"===saveType},on:{click:function(A){saveType="png"}}},[_h("input",{directives:[{name:"model",rawName:"v-model",value:aspectRatio,expression:"aspectRatio"}],attrs:{type:"radio",name:"save-type-group",id:"typepng",autocomplete:"off",value:"9x16"},domProps:{checked:_q(aspectRatio,"9x16")},on:{change:function(A){aspectRatio="9x16"}}})," PNG\n              "])])])])," "," ",_h("div",{staticClass:"row"},[_h("div",{staticClass:"col-sm-12"},[_h("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:handleReset}},["Reset"])," ",_h("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:handleCropAction}},["Crop"])])])," ",_h("div",{staticClass:"row"},[_h("div",{staticClass:"col-sm-12"},[_h("pre",[_h("code",{staticClass:"lang-css"},[_m(7)," ",_h("span",{staticClass:"hljs-rules"},["{",_m(8),"  ",_m(9),";",_m(10),"  ",_m(11),";",_m(12),"  ",_h("span",{staticClass:"hljs-rule"},[_m(13),":",_h("span",{staticClass:"hljs-value"},[" ",_h("span",{staticClass:"hljs-number"},[_s(bgPosition.landscapeLeft)+"%"])," ",_h("span",{staticClass:"hljs-number"},[_s(bgPosition.landscapeTop)+"%"])])]),";",_m(14),"}"]),_m(15),_m(16),_m(17)," ",_h("span",{staticClass:"hljs-rules"},["{",_m(18),"  ",_m(19),";",_m(20),"  ",_m(21),";",_m(22),"  ",_h("span",{staticClass:"hljs-rule"},[_m(23),":",_h("span",{staticClass:"hljs-value"},[" ",_h("span",{staticClass:"hljs-number"},[_s(bgPosition.portraitLeft)+"%"])," ",_h("span",{staticClass:"hljs-number"},[_s(bgPosition.portraitTop)+"%"])])]),";",_m(24),"}"]),_m(25)])])])])," "])," "])," "])," "," ",_h("div",{directives:[{name:"show",rawName:"v-show",value:isDragging,expression:"isDragging"}],staticClass:"drag-area"},[_m(26)])])},staticRenderFns:[function(){with(this)return _h("header",{staticClass:"header"},[_h("a",{attrs:{href:"https://github.com/crimx/portrait-crop",target:"_blank"}},[_h("div",{staticClass:"container"},[_h("h1",{staticClass:"title"},["Portrait Crop"])," ",_h("p",{staticClass:"description"},["Crops images into portrait orientation and marks the focus as background-position"])])])])},function(){with(this)return _h("div",{staticClass:"canvas col-xs-12 col-sm-8"},[_h("div",[_h("img",{attrs:{id:"image",src:__webpack_require__(9)}})])])},function(){with(this)return _h("label",{staticClass:"btn btn-primary",attrs:{type:"button","for":"imagefile"}},["Upload File"])},function(){with(this)return _h("div",{staticClass:"input-group-addon"},["X"])},function(){with(this)return _h("div",{staticClass:"input-group-addon"},["Y"])},function(){with(this)return _h("div",{staticClass:"input-group-addon"},["Width"])},function(){with(this)return _h("div",{staticClass:"input-group-addon"},["Height"])},function(){with(this)return _h("span",{staticClass:"hljs-class"},[".image-landscape"])},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-rule"},[_h("span",{staticClass:"hljs-attribute"},["background-size"]),":",_h("span",{staticClass:"hljs-value"},[" cover"])])},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-rule"},[_h("span",{staticClass:"hljs-attribute"},["background-repeat"]),":",_h("span",{staticClass:"hljs-value"},[" no-repeat"])])},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-attribute"},["background-position"])},function(){with(this)return _h("br")},function(){with(this)return _h("br")},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-class"},[".image-portrait"])},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-rule"},[_h("span",{staticClass:"hljs-attribute"},["background-size"]),":",_h("span",{staticClass:"hljs-value"},[" cover"])])},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-rule"},[_h("span",{staticClass:"hljs-attribute"},["background-repeat"]),":",_h("span",{staticClass:"hljs-value"},[" no-repeat"])])},function(){with(this)return _h("br")},function(){with(this)return _h("span",{staticClass:"hljs-attribute"},["background-position"])},function(){with(this)return _h("br")},function(){with(this)return _h("br")},function(){with(this)return _h("h1",{staticClass:"drag-text"},["DROP",_h("br"),"HERE"])}]}}]);
//# sourceMappingURL=app.19b46a5a48a6a07df4eb.js.map