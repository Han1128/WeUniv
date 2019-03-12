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
    <Modal class="short-text-modal" v-model="modalShow" width="360" @on-cancel="resetFields">
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
                <li class="uplload-list" v-for="(item,index) in imgList" :key="item">
                  <img :src="item">
                  <div class="background-cover">
                    <Icon type="ios-trash-outline" @click.native="deleteImgItem(index)"></Icon>
                  </div>
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
                <i-switch v-model="isTop" @on-change="setArticleTop"></i-switch>
              </span>
            </li>
          </ul>
          <g-emoji v-show="emojiShow" @emojiClick="addEmoji"></g-emoji>
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
import bus from '@/common/bus.js';
import imgUpload from '@/pages/user/components/Img-upload-component'
export default {
  name: 'g-short-text',
  components: { imgUpload },
  directives: {
    ClickOutside
  },
  data () {
    return {
      isTop: false,
      topId: '', // 置顶文章id
      imgList: [], // 图片组合
      editorContent: '', // 输入的内容
      emojiShow: false, // emoji表情框显示状态
      modalShow: false // 模态框显示状态
    }
  },
  created() {
    this.topId = JSON.parse(localStorage.getItem('userData')).topArticle;
    bus.$on('writeShortText', () => {
      this.modalShow = this.modalShow ? false : true;
    })
  },
  // destroyed() {
  //   bus.$off('writeShortText');
  // },
  mounted() {
  },
  methods: {
    addEmoji(emoji) {
      this.editorContent = this.editorContent + emoji;
    },
    showEmoji() {
      this.emojiShow = this.emojiShow ? false : true;
    },
    deleteImgItem(index) {
      this.imgList.splice(index, 1);
    },
    hideEmoji() {
      this.emojiShow = false;
    },
    resetFields() {
      this.imgList = [];
      this.isTop = false;
      this.editorContent = '';
    },
    setArticleTop(status) {
      if (this.topId && status === true) {
        this.$Modal.confirm({
          title: '操作提示',
          content: `<p>您已有置顶文章,是否提交后替换该文章?</p>`,
          onOk: () => {
            this.isTop = true;
          },
          onCancel: () => {
            this.isTop = false;
          }
        });
      }
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
        isTop: this.isTop,
        topId: this.topId, // 置顶文章id
      }
      this.axios.post('/addShortArticle', data)
      .then(res => {
        this.$Message.success('提交成功');
        this.modalShow = false;
        bus.$emit('updateHomeData'); // 主页更新
        bus.$emit('updateUserData'); // 用户页更新
      })
      .catch(err => {
        this.$Message.error('提交失败');
      })
    }
  }
}
</script>
