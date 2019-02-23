<style lang="less" scoped>
.article-view {
  .article-view-area {
    width: 55%;
    margin: 0 auto;
    margin-top: 6rem;
    padding: 0 1rem;
    box-sizing: border-box;
    .cover-bg {
      width: 100%;
    }
    .title {
      font-size: 3.3rem;
      margin: 1rem 0;
      margin-bottom: 1.5rem;
    }
    .author-info {
      img {
        height: 5rem;
        border-radius: 5rem;
        float: left;
      }
      .info-tags {
        height: 5rem;
        margin: .5rem 0;
        margin-left: 6rem;
        padding-top: .5rem;
        font-size: 1.7rem;
        .public-time {
          font-size: 1.3rem;
        }
      }
    }
    /deep/.article-content {
      p, h1, h2, h3, h4, h5, table, pre {
        margin: 15px 0;
        line-height: 1.6;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      p {
        font-size: 1.6rem;
        line-height: 2.8rem;
      }
      ol {
        margin: 10px 0 10px 20px;
        li {
          font-size: 1.5rem;
          margin: .3rem 0;
        }
      }
      blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
      }
      code {
        width: 100%;
        display: inline-block;
        background-color: #f1f1f1;
        border-radius: 3px;
        padding: 10px;
        margin: 0 3px;
        border-radius: 5px;
        line-height: 1.5;
        color: #333;
      }
    }
    .btn-list {
      text-align: center;
      button {
        height: 5rem;
        font-size: 1.6rem;
        border-radius: .5rem;
        margin-right: 3rem;
        margin-bottom: 3rem;
      }
      .like {
        color: #fff;
        background: #009A61;
      }
    }
    .comment-panel {
      margin-bottom: 10rem;
      .comment-list {
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
<template>
  <div class="article-view">
    <g-header></g-header>
    <div class="article-view-area" >
      <img class="cover-bg" v-show="articleDetail.coverBg" :src="getArticleImg">
      <h1 class="title">{{articleDetail.title}}</h1>
      <div class="author-info">
        <img :src="getUserAvatar">
        <div class="info-tags">
          <p>{{getUsername}}</p>
          <p class="public-time">发表于 <Time :time="getPublicTime" type="datetime" /></p>
        </div>
      </div>
      <div class="article-content" v-html="articleDetail.content"></div>
      <div class="btn-list">
        <Button v-if="!hasLikeArticle" icon="ios-heart" @click="addToList('add', 'like')">赞 ｜ {{getLikeLength}}</Button>
        <Button v-else class="like" icon="ios-heart" @click="addToList('cancel', 'like')">赞 ｜ {{getLikeLength}}</Button>
        <Button v-if="!hasCollectArticle" icon="ios-bookmark" @click="addToList('add', 'collect')">收藏 ｜ {{getCollectLength}}</Button>
        <Button v-else class="like" icon="ios-bookmark" @click="addToList('cancel', 'collect')">收藏 ｜ {{getCollectLength}}</Button>
      </div>
      <comment-panel
        :articleId="articleDetail._id"
        :commentList="articleDetail.commentFrom || []"
        :avatar="getUserAvatar">
      </comment-panel>
    </div>
  </div>
</template>
<script>
import commentPanel from '../user/components/comment-panel'
export default {
  components: { commentPanel },
  data () {
    return {
      articleDetail: {},
      articleId: '',
      userId: ''
    }
  },
  created() {
    //用户信息和文章信息通过props分开传
    this.articleId = this.$route.params.articleid;
    this.userId = localStorage.getItem('userid');
    this.getDesignArticle();
  },
  computed: {
    getArticleImg() {
      return this.articleDetail.coverBg ? this.articleDetail.coverBg[0] : '#';
    },
    getUserAvatar() {
      return this.articleDetail.author ? this.articleDetail.author.avatar : '#';
    },
    getUsername() {
      return this.articleDetail.author ? this.articleDetail.author.username : '';
    },
    getPublicTime() {
      return this.articleDetail.public_time ? this.articleDetail.public_time.toString() : new Date();
    },
    getLikeLength() {
      return this.articleDetail.likeBy ? this.articleDetail.likeBy.length : 0;
    },
    getCollectLength() {
      return this.articleDetail.collectBy ? this.articleDetail.collectBy.length : 0;
    },
    hasLikeArticle() {
      if(!this.articleDetail) return false;
      return this.articleDetail.likeBy.includes(this.userId) ? true : false;
    },
    hasCollectArticle() {
      if(!this.articleDetail) return false;
      return this.articleDetail.collectBy.includes(this.userId) ? true : false;
    },
  },
  methods: {
    addToList(operator, type) {
      // 判断操作文章的id是否是用户自己的文章
      const userData = JSON.parse(localStorage.getItem('userData'));
      let data = {
        userId: this.userId,
        username: localStorage.getItem('username'),
        articleId: this.articleDetail._id,
        type: operator, // 是点赞还是取消点赞
        ownOperator: userData.article.includes(this.articleDetail._id) // 是否是自己操作
      }
      let api = type === 'like' ? '/addLike' : '/addCollect';
      this.axios.post(api, data)
      .then(res => {
        this.getDesignArticle();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    getDesignArticle() {
      this.axios.get('/getDesignArticle', {
        params: {
          articleId: this.articleId
        }
      })
      .then(res => {
        this.articleDetail = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
