<style lang="less" scoped>
.comment-panel {
  overflow: hidden;
  padding-top: 2rem;
  line-height: 4rem;
  .submit-area {
    margin-bottom: 2rem;
    .ivu-input-wrapper {
      width: auto;
    }
    .emoji-btn {
      font-size: 2.5rem;
      margin-right: .5rem;
      cursor: pointer;
      &:hover {
        color: #19BE6B;
      }
    }
    img {
      width: 4rem;
      height: 4rem;
      margin-left: 1rem;
      margin-right: 1.5rem;
      float: left;
      border-radius: 4rem;
    }
    /deep/.ivu-input {
      width: 50rem;
      font-size: 1.4rem;
    }
  }
}
</style>
<template>
  <div class="comment-panel">
    <div class="submit-area">
      <span>
        <Icon class="emoji-btn" type="md-happy" v-click-outside="hideEmoji" @click="showEmoji"/>
        <Input v-model="editorContent" placeholder="Enter something..." ></Input>
      </span>
      <img :src="avatar">
      <g-emoji v-show="emojiShow" @emojiClick="addEmoji"></g-emoji>
      <Button @click="submitComment">评论</Button>
    </div>
    <div class="history-comment" v-show="commentList.length !== 0">
      哈哈哈
    </div>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import ClickOutside from 'vue-click-outside';
export default {
  props: {
    avatar: {
      type: String
    },
    commentList: {
      type: Array,
      default: []
    },
    articleId: {
      type: String
    }
  },
  directives: {
    ClickOutside
  },
  data () {
    return {
      editorContent: '', // 输入的内容
      emojiShow: false, // emoji表情框显示状态
    }
  },
  methods: {
    addEmoji(emoji) {
      this.editorContent = this.editorContent + emoji;
    },
    showEmoji() {
      this.emojiShow = this.emojiShow ? false : true;
    },
    hideEmoji() {
      this.emojiShow = false;
    },
    submitComment() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        articleId: this.articleId,
        content: this.editorContent,
        ownOperator: userData.article.includes(this.articleId) // 是否是自己操作
      }
      this.axios.post('/postComment', data)
      .then(res => {
        console.log('res', res);
        bus.$emit('uploadUserData');
      })
      .catch(err => {
        console.log('err', err);
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
