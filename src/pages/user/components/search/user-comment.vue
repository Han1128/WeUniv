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
    <h2>{{getListTitle}}</h2>
    <ul class="comment-details">
      <li v-for="item in commentList" :key="item._id">
        <div class="list-img">
          <img :src="userAuthorDetails.avatar">
        </div>
        <div class="list-content">
          <p>{{userAuthorDetails.username}}</p>
          <p>
            {{item.isReply ? '回复' : '评论'}}了{{item.from_author.username}}的
            {{item.isReply ? '评论' : item.from_article.type === 'long' ? '文章' : '说说'}}
            {{item.isReply ? item.from_comment.content : item.from_article.title || item.from_article.content }}
            <span style="float: right">{{item.commentTime}}</span>
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
        console.log('err', err)
      })
    },
  }
}
</script>
