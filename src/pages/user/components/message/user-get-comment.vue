<style lang="less" scoped>
.user-comment-list {
  .comment-details {
    li {
      overflow: hidden;
      padding: .5rem 0;
      .list-img {
        float: left;
        img {
          height: 4rem;
          border-radius: 4rem;
        }
      }
    }
  }
}
</style>
<template>
  <div class="user-comment-list">
    <h2>收到的评论</h2>
    <ul class="comment-details">
      <li v-for="item in commentList" :key="item._id">
        <div class="list-img">
          <img :src="item.from_user.avatar">
        </div>
        <div class="list-content">
          <p>
            {{item.from_user.username}}
            {{item.from_article ? '评论' : '回复'}}了你的
            {{item.from_article ? item.from_article.type === 'long' ? '文章' : '说说' : '评论'}}
            {{item.from_article ? item.from_article.title || item.from_article.content : item.from_comment.content }}
            {{item.from_article ? item.from_comment.content : '' }}
            <span style="float: right">{{item.time}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
const R = require('ramda');
export default {
  data () {
    return {
      userId: '',
      commentList: [], // 登录用户
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getCommentList();
  },
  methods: {
    // 获取当前页作者的信息 需要展示渲染页面
    getCommentList() {
      this.axios.get('/getCommentMsg', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.commentList = res.data.result.message;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
