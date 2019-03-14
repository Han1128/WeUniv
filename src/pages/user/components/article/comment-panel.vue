<style lang="less" scoped>
.comment-panel {
  border-radius: 0 0 .5rem .5rem;
  border: 1px solid #dedede;
  box-shadow: -1px 0 1px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  padding-top: 2rem;
  line-height: 4rem;
  .submit-area {
    margin-bottom: 2rem;
    .btn-style {
      float: right;
      margin-right: 2rem;
    }
    .comment-box {
      width: auto;
      white-space: nowrap;
      margin-left: 6rem;
      margin-right: 8rem;
      .ivu-input-wrapper {
        width: calc(100% - 5rem);
        /deep/.ivu-input {
          width: 100%;
          font-size: 1.4rem;
        }
      }
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
      margin-left: 1.5rem;
      margin-right: 1rem;
      float: left;
      border-radius: 4rem;
    }
  }
  .history-comment {
    .comment-list {
      width: auto;
      overflow: hidden;
      padding-top: 1rem;
      padding-bottom: 1rem;
      a {
        color: #19BE6B;
      }
      &:hover {
        background: #ccc;
      }
      .header {
        height: 4rem;
        float: left;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 4rem;
          margin-left: 1.5rem;
        }
      }
      .content {
        margin-left: 6.5rem;
        .content-top {
          .info-username {
            margin-right: .5rem;
          }
        }
        .content-top-reply {
          .reply-area {
            margin-right: 10rem;
            .reply-history {
              background: #EAEAEC;
              border-radius: .5rem;
              padding-left: 1.5rem;
            }
          }
        }
        .content-bottom {
          height: 2rem;
          line-height: 2rem;
          .info-reply {
            float: right;
            margin-right: 1rem;
            span {
              margin-right: 2rem;
              user-select: none;
              cursor: pointer;
              &:hover {
                color: #19BE6B;
              }
            }
            .reply {
              vertical-align: text-top;
            }
            .like {
              color: #19BE6B;
            }
          }
        }
      }
    }
    .reply-panel {
      border-radius: .3rem;
      background: #eee;
      margin: .3rem 0;
      .ivu-input-wrapper {
        width: 46rem;
        margin-left: .5rem;
      }
      .reply-emoji-btn {
        font-size: 2.5rem;
        margin-left: 2rem;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
<template>
  <div class="comment-panel">
    <!-- 评论输入区 -->
    <div class="submit-area">
      <img :src="avatar">
      <div class="btn-style">
        <Button @click="submitComment">评论</Button>
      </div>
      <div class="comment-box">
        <Icon class="emoji-btn" type="md-happy" v-click-outside="hideEmoji" @click="showEmoji"/>
        <i-input v-model="editorContent" placeholder="Enter something..." ></i-input>
        <!-- <input type="text"> -->
      </div>
      <g-emoji v-show="emojiShow" @emojiClick="addEmoji"></g-emoji>
    </div>

    <div class="history-comment" v-show="commentList.length !== 0">
      <ul v-for="(item,index) in commentList" :key="item._id">
        <li>
          <div class="comment-list">
            <div class="header">
              <img :src="item.from_author.avatar || defaultAvatar">
            </div>
            <div class="content">
              <!-- 非回复评论 -->
              <div class="content-top" v-if="!item.isReply">
                <router-link class="info-username" tag="a" :to="'/user/' + item.from_author._id">{{item.from_author.username}}</router-link>
                <span>{{item.content}}</span>
              </div>
              <!-- 回复评论 -->
              <div v-else class="content-top-reply">
                <router-link tag="a" :to="'/user/' + item.from_author._id">{{item.from_author.username}}</router-link>
                <span style="padding-left: 1rem;">回复评论:</span>
                <div class="reply-area">
                  <div class="reply-history">
                    <router-link tag="a" :to="'/user/' + item.from_comment.from_author._id">{{item.from_comment.from_author.username + ':'}}</router-link>
                    <span style="padding-left: 1rem;">{{item.from_comment.content}}</span>
                  </div>
                  <div class="reply-content">
                    {{item.content}}
                  </div>
                </div>
              </div>
              <!-- 评论底部时间和 '回复' '赞' -->
              <div class="content-bottom">
                <span class="info-time"><Time :time="Date.parse(item.commentTime)" :type="getDateType(item.commentTime)"/></span>
                <span class="info-reply">
                  <span class="reply" @click="replyComment(index)">回复</span>
                  <span v-if="!judgeLikeStatus(item.likeBy)" @click="addCommentLike('add', item)">
                    <Icon type="md-thumbs-up"/>赞 {{item.likeBy.length}}
                  </span>
                  <span v-else class="like" @click="addCommentLike('cancel', item)">
                    <Icon type="md-thumbs-up"/>赞 {{item.likeBy.length}}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <!-- 回复评论区 -->
          <div class="reply-panel" v-if="replyShow === index">
            <Icon class="reply-emoji-btn" type="md-happy" v-click-outside="hideReplyEmoji" @click="showReplyEmoji"/>
            <g-emoji v-show="replyEmojiShow" @emojiClick="addReplyEmoji"></g-emoji>
            <i-input v-model="replyContent"></i-input>
            <Button @click="confirmReply(item)">评论</Button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import { DEFAULT_AVATAR } from '@/constant/index.js';
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
    },
    author_id: {
      type: String
    }
  },
  directives: {
    ClickOutside
  },
  data () {
    return {
      replyShow: -1, // 回复输入框显示
      replyContent: '', // 回复内容
      editorContent: '', // 输入的内容
      emojiShow: false, // emoji表情框显示状态
      replyEmojiShow: false, // 回复emoji表情框显示状态
      defaultAvatar: DEFAULT_AVATAR
    }
  },
  methods: {
    addEmoji(emoji) {
      this.editorContent = this.editorContent + emoji;
    },
    addReplyEmoji(emoji) {
      this.replyContent = this.replyContent + emoji;
    },
    showEmoji() {
      this.emojiShow = this.emojiShow ? false : true;
    },
    showReplyEmoji() {
      this.replyEmojiShow = this.replyEmojiShow ? false : true;
    },
    hideEmoji() {
      this.emojiShow = false;
    },
    hideReplyEmoji() {
      this.replyEmojiShow = false;
    },
    getDateType(time) {
      return Date.parse(new Date()) - Date.parse(time) > 86400 * 3 * 1000 ? 'date' : 'relative'
    },
    // 判断该评论是否被自己赞过
    judgeLikeStatus(likeByList) {
      return likeByList.includes(localStorage.getItem('userid')) ? true : false;
    },
    replyComment(index) {
      if (this.replyShow === -1) {
        this.replyShow = index;
      }
      else {
        this.replyShow = -1;
      }
    },
    // 评论点赞
    addCommentLike(type, item) {
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        comment_author: item.from_author._id, // 被点赞的评论的作者
        commentId: item._id, // 被点赞评论id
        type // 是点赞还是取消点赞
      }
      this.axios.post('/addCommentLike', data)
      .then(res => {
        bus.$emit('updateHomeData'); // 主页更新
        bus.$emit('updateUserData'); // 用户页更新
        bus.$emit('updateDesignArticle'); // 用户页更新
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 回复评论
    confirmReply(item) {
      if (!this.replyContent) return;
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'), // 评论者
        comment_author: item.from_author._id,// 被评论者
        commentId: item._id, // 回复哪条评论
        articleId: this.articleId, // 在哪篇文章下评论
        content: this.replyContent, // 回复内容
        isReply: true, // 是否回复别人
      }
      this.axios.post('/postReplyComment', data)
      .then(res => {
        bus.$emit('updateHomeData'); // 主页更新
        bus.$emit('updateUserData'); // 用户页更新
        bus.$emit('updateDesignArticle'); // 用户页更新
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally (_ => {
        this.replyContent = '';
        this.replyShow = -1;
      })
    },
    // 发表评论
    submitComment() {
      if (!this.editorContent) return;
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        authorId: this.author_id, // 文章的作者是谁
        articleId: this.articleId, // 在哪篇文章下评论
        content: this.editorContent, // 评论内容
        isReply: false, // 是否回复别人
      }
      this.axios.post('/postComment', data)
      .then(res => {
        bus.$emit('updateHomeData'); // 主页更新
        bus.$emit('updateUserData'); // 用户页更新
        bus.$emit('updateDesignArticle'); // 用户页更新
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally (_ => {
        this.editorContent = '';
      })
    }
  }
}
</script>
