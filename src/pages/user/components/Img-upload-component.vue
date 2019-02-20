<style lang="less" scoped>
.upload-img {
  /deep/.ivu-upload {
    border: none;
  }
  .preview {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    .preview-show {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      }
    }
  }
}
</style>
<template>
  <div class="upload-img">
    <Upload
        ref="upload"
        type="drag"
        action="#"
        :show-upload-list="false"
        :before-upload="handleBeforeUpload"
        style="display: inline-block;">
        <slot name="upload-btn"></slot>
    </Upload>
    <Modal
        v-model="imgUpload"
        class="img-cropper"
        title="请选择合适区域作为头像"
        @on-ok="confirmUpload"
        @on-cancel="cancelUpload">
        <div class="cropper" >
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="outputType"
            :info="true"
            :original="option.original"
            :full="option.full"
            :fixedBox="fixedBox"
            :fixed="fixed"
            :fixedNumber="fixedNumber"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :centerBox="option.centerBox"
            :autoCrop="option.autoCrop"
            :autoCropWidth="autoCropWidth"
            :autoCropHeight="autoCropHeight"
            :maxImgSize="option.maxImgSize"
            style="width: 50rem;height: 30rem"
          ></vueCropper>
          <div class="button-list">
            <Button type="primary" shape="circle" icon="md-undo" @click="rotateLeft">向左转</Button>
            <Button type="primary" shape="circle" icon="md-redo" @click="rotateRight">向右转</Button>
            <Button type="primary" shape="circle" icon="md-refresh" @click="refresh">刷新</Button>
            <Button type="primary" shape="circle" icon="md-eye" @click="repreview">预览</Button>
          </div>
        </div>
    </Modal>
    <div class="preview" v-show="preview" @click="preview = false">
      <div class="preview-show">
        <img :src="cropperSrc" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper }  from 'vue-cropper'
export default {
  components: { VueCropper },
  props: {
    outputType: {
      type: String,
      default: 'png'
    },
    fixedBox: {
      type: Boolean,
      default: false
    },
    autoCropWidth: {
      type: Number,
      default: 200
    },
    autoCropHeight: {
      type: Number,
      default: 200
    },
    submitType: {
      type: String
    },
    fixed: {
      type: Boolean,
      default: false
    },
    fixedNumber: {
      type: Array,
      default: [1, 1]
    }
  },
  data () {
    return {
      imgName: '',
      visible: false,
      imgUpload: false,
      preview: false,
      cropperSrc: '',
      fileType: '', // 文件类型
      option: {
				img: '',
        outputSize: 1,
        // outputType: 'png',
        info: true,
        size: 1,
				original: false, // 上传图片是否显示原始宽高
        full: false, // 是否输出原图比例的截图
        // fixedBox: false, // 截图固定大小
        // fixed: false, // 是否开启截图框宽高固定比例
        // fixedNumber: [1, 1], // 截图框的宽高比例
        canScale: true, // 图片是否允许滚轮缩放
        canMove: true,
				canMoveBox: true,
        centerBox: true, // 截图框是否限制在图片里
				autoCrop: true, // 是否默认生成截图框
				// autoCropWidth: 200, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        maxImgSize: 1000 // 限制图片最大宽度和高度
      }
    }
  },
  methods: {
    // 图片上传之前的钩子
    handleBeforeUpload (file) {
      // 判断类型
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        // 文件类型出错
        this.$Notice.warning({
            title: '文件不规范',
            desc: '您提交的文件格式不合规范,请重新提交'
        });
        return false;
      }
      // 判断大小
      if (file.size / (1024 * 1024) > 2) {
        // 文件太大
        this.$Notice.warning({
            title: '文件不规范',
            desc: '您提交的文件超出大小限制,请重新选择'
        });
        return false;
      }
      this.fileType = file.type.split('/')[1];
      let reader = new FileReader();
      reader.readAsDataURL(file)
      let _this = this;
      reader.onloadend = function (e) {
        _this.imgUpload = true;
        _this.option.img = reader.result;
      }
      return false;
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    refresh() {
      this.$refs.cropper.refresh()
    },
    repreview() {
      this.$refs.cropper.getCropData((data) => {
        this.preview = true
        this.cropperSrc = data
      })
    },
    confirmUpload() {
      this.$refs.cropper.getCropData((data) => {
        this.cropperSrc = data
        // 异步队列 放在外面传到父组件的data就是"",因为还没有赋值
        if (this.submitType === 'avatar') {
          this.$emit('cropperSuccess', { fileType: this.fileType, cropperSrc: this.cropperSrc });
        }
        else if (this.submitType === 'articleBg') {
          this.$emit('cropperSuccess', this.cropperSrc);
        }
      })
    },
    cancelUpload() {
    }
  }
}
</script>
