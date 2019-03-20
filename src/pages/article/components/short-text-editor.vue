<style lang="less" scoped>
.short-text-editor {
  background: #fff;
  padding: 1rem 2rem;
  margin-top: 1rem;
  border-radius: .5rem;
  .box-header {
    font-weight: bold;
    color: rgb(0, 154, 97);
    text-align: center;
    font-size: 1.6rem;
    padding: 1rem 0;
  }
  .box-center {
    .short-text-input {
      .img-area {
        width: auto;
        height: 8rem;
        padding: 1rem;
        box-sizing: content-box;
        li {
          float: left;
          img {
            width: 8rem;
            height: 8rem;
            border-radius: .5rem;
          }
          .add-img {
            width: 8rem;
            height: 8rem;
            border-radius: .5rem;
            margin-right: 2rem;
            border: 1.2px dashed;
            font-size: 4.5rem;
            text-align: center;
            cursor: pointer;
            &:hover {
              color: #D1D1D1;
              background: #eee;
            }
          }
        }
        .uplload-list {
          display: inline-block;
          position: relative;
          font-size: 0;
          margin-right: 2rem;
          .background-cover {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
            .ivn-icon {
              color: #fff;
              font-size: 2rem;
              cursor: pointer;
              margin: 0 2px;
            }
          }
          &:hover {
            .background-cover {
              display: block;
              .ivu-icon {
                font-size: 3.5rem;
                color: #fff;
                cursor: pointer;
                user-select: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }
          }
        }
      }
    }
    .box-option {
      .btn-list {
        overflow: hidden;
        padding: .5rem;
        li {
          float: left;
          font-size: 1.5rem;
          margin-right: 2rem;
          cursor: pointer;
        }
        & li:last-child {
          float: right;
          margin-right: 0;
        }
        /deep/.ivu-icon {
          margin-right: .8rem;
          font-size: 1.8rem;
          vertical-align: text-bottom;
        }
      }
      .article-top {
        float: right;
      }
    }
    .emoji-content {
      position: absolute !important;
    }
  }
  .box-footer {
    margin-bottom: 1rem;
    .submit-btn {
      background: #009A61;
      color: #fff;
    }
  }
}
</style>
<template>
  <div class="short-text-editor">
    <!-- 自定义头部 -->
    <p class="box-header">
      <span>发说说</span>
    </p>
    <!-- 中间部分 -->
    <div class="box-center">
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
      <div class="box-option">
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
                <Icon type="md-images"/>图片
              </div>
            </img-upload>
          </li>
          <li>
            <div>
              <Icon type="ios-pricetags"/>话题
            </div>
          </li>
          <li>
            <span class="article-top">
              是否置顶
              <i-switch v-model="isTop" @on-change="setArticleTop"></i-switch>
            </span>
          </li>
        </ul>
      </div>
      <g-emoji v-show="emojiShow" @emojiClick="addEmoji"></g-emoji>
    </div>
    <!-- 自定义尾部 -->
    <div class="box-footer">
      <Button @click="shortTextConfirm" class="submit-btn" size="large" long >发布</Button>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import bus from '@/common/bus.js';
import imgUpload from '@/pages/user/components/Img-upload-component'
export default {
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
    }
  },
  created() {
    this.topId = JSON.parse(localStorage.getItem('userData')).topArticle;
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
    shortTextConfirm() {
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        content: this.editorContent,
        coverBg: this.imgList,
        isTop: this.isTop, // 是否置顶
        topId: this.topId, // 置顶文章id
      }
      this.axios.post('/addShortArticle', data)
      .then(res => {
        this.$Message.success('提交成功');
        this.resetFields();
        this.$emit('uploadUserData');
      })
      .catch(err => {
        console.error('err', err);
        this.$Message.error('提交失败');
      })
    }
  }
}
</script>
