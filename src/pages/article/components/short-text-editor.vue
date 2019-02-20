<style lang="less" scoped>
.short-text-editor {
  .modal-center {
    .emoji-content {
      position: absolute !important;
    }
  }
}
</style>
<template>
  <div class="short-text-editor">
    <Modal class="short-text-modal" v-model="modalShow" width="360">
        <!-- 自定义头部 -->
        <p slot="header" style="color:#009a61;text-align:center">
            <span>发说说</span>
        </p>
        <!-- 中间部分 -->
        <div class="modal-center">
          <div class="short-text-input">
            <Input
              :rows="4"
              v-model="editorContent"
              type="textarea"
              placeholder="Enter something..." />
            <div class="img-area" v-show="imgList.length !== 0">
              <ul>
                <li v-for="item in imgList" :key="item">
                  <img :src="item">
                </li>
                <li>
                  <img-upload
                    :fixed="true"
                    :fixedNumber="[1,1]"
                    :submitType="'articleBg'"
                    @cropperSuccess="cropperSuccess">
                    <div slot="upload-btn">
                      <div class="add-img">
                        <Icon type="md-add" />
                      </div>
                    </div>
                  </img-upload>
                </li>
              </ul>
            </div>
          </div>
          <ul class="btn-list">
            <li @click="showEmoji" v-click-outside="hideEmoji">
              <Icon class="emoji-btn" type="md-happy"/>表情
            </li>
            <li>
              <img-upload
                :fixed="true"
                :fixedNumber="[1,1]"
                :submitType="'articleBg'"
                @cropperSuccess="cropperSuccess">
                <div slot="upload-btn">
                  <Icon type="md-images" />图片
                </div>
              </img-upload>
            </li>
            <li style="float: right">
              <span class="article-top">
                是否置顶
                <i-switch v-model="isTop"></i-switch>
              </span>
            </li>
          </ul>
          <picker class="emoji-content" v-show="emojiShow" @select="addEmoji"/>
        </div>
        <!-- 自定义尾部 -->
        <div slot="footer">
            <Button @click="shortTextConfirm" class="submit-btn" size="large" long >发布</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { Picker } from 'emoji-mart-vue'
import bus from '@/common/bus.js';
import imgUpload from '@/pages/user/components/Img-upload-component'
export default {
  name: 'editor',
  components: { imgUpload, Picker },
  directives: {
    ClickOutside
  },
  data () {
    return {
      isTop: false,
      imgList: [], // 图片组合
      editorContent: '', // 输入的内容
      emojiShow: false, // emoji表情框显示状态
      modalShow: false // 模态框显示状态
    }
  },
  created() {
    bus.$on('writeShortText', () => {
      this.modalShow = true;
    })
  },
  destroyed() {
    bus.$off('writeShortText');
  },
  mounted() {
  },
  methods: {
    addEmoji(emoji) {
      this.editorContent = this.editorContent + emoji.native;
    },
    showEmoji() {
      this.emojiShow = true;
    },
    hideEmoji() {
      this.emojiShow = false;
    },
    cropperSuccess(url) {
      if(this.imgList.length <= 3) {
        this.imgList.push(url);
      }
      else {
        this.$Notice.warning({
            title: '数量超出',
            desc: '上传的图片不能多于4张'
        });
      }
    },
    shortTextConfirm() {
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        content: this.editorContent,
        coverBg: this.imgList,
        isTop: this.isTop
      }
      this.axios.post('/addShortArticle', data)
      .then(res => {
        console.log('res', res);
        this.$Message.success('提交成功');
        this.modalShow = false;
      })
      .catch(err => {
        console.error('err', err);
        this.$Message.error('提交失败');
      })
    }
  }
}
</script>
