<style lang="less" scoped>
.upload-img {
  .upload-title {
    height: 6rem;
    font-size: 2rem;
    padding-top: 2rem;
    margin: 0 3rem;
  }
  .ivu-divider {
    width: auto;
    margin: 20px;
    background: #d9d9d9;
  }
  .upload-content {
    /deep/.ivu-upload {
      width: 9rem;
      .upload-btn {
        width: 9rem;
        height: 5rem;
        line-height: 5rem;
      }
    }
    .mid-avatar {
      width: 9rem;
      height: 9rem;
      border-radius: 9rem;
      margin-left: 3rem;
    }
  }
}
</style>
<template>
  <div class="upload-img">
    <h2 class="upload-title">上传头像</h2>
    <Divider/>
    <div class="upload-content">
      <img :src="userAvatar" class="mid-avatar">
      <p>图片预览</p>
      <g-img-upload
        class="avatar-upload"
        :submitType="'avatar'"
        @cropperSuccess="confirmUpload">
        <div slot="upload-btn" class="upload-btn">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
      </g-img-upload>
    </div>
  </div>
</template>
<script>
import { DEFAULT_AVATAR } from '@/constant/index.js';
import imgUpload from '../Img-upload-component';
export default {
  components: {  imgUpload },
  data () {
    return {
      preview: false,
      userData: {}
    }
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  },
  computed: {
    userAvatar() {
      return this.userData.avatar ? this.userData.avatar : DEFAULT_AVATAR;
    }
  },
  methods: {
    confirmUpload(result) {
      const oldAvatar = this.userAvatar === DEFAULT_AVATAR ? '' : this.userAvatar;
      this.axios.post('/uploadAvatar', {
        userId: localStorage.getItem('userid'),
        imgName: localStorage.getItem('username'),
        fileType: result.fileType,
        cropperImg: result.cropperSrc,
        oldAvatar: oldAvatar
      })
      .then(res => {
        console.log('res', res)
        this.$Notice.success({ title: '提示', desc: res.message });
        this.userData.avatar = res.data.url;
        localStorage.setItem('userData', JSON.stringify(this.userData));
      })
      .catch(err => {
        console.log('err', err)
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
