<style lang="less" scoped>
.user-comment-list {
  min-height: 70rem;
  margin: 0 2rem;
  margin-right: 13rem;
  border-radius: .5rem;
  background: #fff;
  border: 1px solid #d9d9d9;
  box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.8);
  .list-header {
    padding: 2rem;
    padding-left: 3rem;
  }
  .ivu-divider {
    width: auto;
    margin: 0;
    clear: none;
    margin: 0 3rem;
  }
  .comment-details {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    li {
      margin: 0 1rem;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: .6rem 1rem;
      overflow: hidden;
      .list-img {
        float: left;
        padding: .5rem 0;
        margin-right: 1.5rem;
        img {
          height: 4rem;
          border-radius: 4rem;
        }
      }
      .list-content {
        padding: .5rem 0;
        .content-author {
          color: #009A61;
        }
        .content-article {
          color: #009A61;
        }
      }
      &:hover {
        border-left: 3px solid #333;
        background: #eee;
      }
    }
    & li:first-child {
      border-top: none;
    }
  }
}
</style>
<template>
  <div class="user-comment-list">
    <h2 class="list-header">收到的评论</h2>
    <Divider/>
    <ul class="comment-details">
      <li v-for="item in commentList" :key="item._id">
        <div class="list-img">
          <img :src="item.from_user.avatar">
        </div>
        <div class="list-content">
          <p>
            <span class="content-author">{{item.from_user.username}}</span>
            {{item.from_article ? '评论' : '回复'}}了你的
            {{item.from_article ? item.from_article.type === 'long' ? '文章' : '说说' : '评论'}}
            <span class="content-article">
              {{item.from_article ? item.from_article.title || item.from_article.content : item.from_comment.content }}
              {{item.from_article ? item.from_comment.content : '' }}
            </span>
            <span style="float: right"><Time :time="item.time" type="datetime" /></span>
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
