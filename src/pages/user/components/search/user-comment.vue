<style lang="less" scoped>
.user-comment-list {
  padding: 1rem 0;
  background: #fff;
  border: 1px solid #d9d9d9;
  box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.8);
  .list-header {
    padding: 1rem;
  }
  .ivu-divider {
    margin: 0;
    clear: none;
  }
  .comment-details {
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
        margin-left: 1rem;
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
        .content-time {
          float: right;
          margin-right: 1rem;
        }
      }
      &:hover {
        border-left: 3px solid #333;
        background: #eee;
      }
    }
  }
}
</style>
<template>
  <div class="user-comment-list">
    <h2 class="list-header">{{getListTitle}}</h2>
    <Divider/>
    <ul class="comment-details">
      <li v-for="item in commentList" :key="item._id">
        <div class="list-img">
          <img :src="userAuthorDetails.avatar">
        </div>
        <div class="list-content">
          <p>{{userAuthorDetails.username}}</p>
          <p>
            {{item.isReply ? '回复' : '评论'}}了
            <span class="content-author">{{item.from_author.username}}的</span>
            {{item.isReply ? '评论' : item.from_article.type === 'long' ? '文章' : '说说'}}
            <span class="content-article">
              {{item.isReply ? item.from_comment.content : item.from_article.title || item.from_article.content }}
            </span>
            <span class="content-time">
              <Time :time="item.commentTime.toString()" type="datetime" />
            </span>
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
      authorId: '',
      userAuthorDetails: {}, // 页面作者
      commentList: [], // 登录用户
    }
  },
  computed: {
    getListTitle() {
      let appellation = '我的';
      if (this.userId === this.authorId) {
        appellation = '我的'
      }
      else if (this.userAuthorDetails.gender) {
        appellation = '他的';
      }
      else {
        appellation = '她的';
      }
      return appellation.concat('评论');
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.authorId = this.$route.params.userid;
    this.getCommentList();
  },
  methods: {
    // 获取当前页作者的信息 需要展示渲染页面
    getCommentList() {
      this.axios.get('/getUserComment', {
        params: {
          authorId: this.authorId
        }
      })
      .then(res => {
        this.userAuthorDetails = R.pick(['_id', 'username', 'avatar', 'gender', 'description'])(res.data.result);
        this.commentList = res.data.result.comment;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
