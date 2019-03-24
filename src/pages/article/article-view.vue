<style lang="less" scoped>
.article-view {
  .sidebar-options {
    display: none;
    position: fixed;
    top: 30rem;
    left: 20rem;
    li {
      font-size: 2.8rem;
      .ivu-icon {
        cursor: pointer;
        &:hover {
          color: #009A61;
        }
      }
    }
    span {
      font-size: 1.5rem;
      margin-left: -.5rem;
    }
    .like {
      color: #009A61;
    }
  }
  .article-view-area {
    width: 55%;
    margin: 0 auto;
    margin-top: 6rem;
    padding: 0 1rem;
    box-sizing: border-box;
    .loading-style {
      position: absolute;
      top: 50%;
      left: 50%;
      fill: rgb(0, 154, 97);
      width: 8rem;
      height: 8rem;
    }
    .cover-bg {
      width: 95%;
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
        padding: .8rem 1rem;
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
    .comment-column {
      font-size: 1.8rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.09);
    }
    .btn-list {
      text-align: center;
      margin-top: 5rem;
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
    .comment-panel {
      border: none;
      /deep/.comment-list {
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-left: none;
        border-right: none;
      }
    }
  }
}
</style>
<template>
  <div class="article-view">
    <g-header></g-header>
    <BackTop></BackTop>
    <ul class="sidebar-options">
      <li @click="addToList('like')" :class="{'like': hasLikeArticle}">
        <Icon type="ios-heart" />
        <span>{{getLikeLength}}</span>
      </li>
      <li @click="addToList('collect')" :class="{'like': hasCollectArticle}">
        <Icon type="ios-bookmark" />
        <span>{{getCollectLength}}</span>
      </li>
      <li @click="scrollToComment">
        <Icon type="md-chatboxes" />
      </li>
      <li v-show="userId === getUserId" @click="turnToEdit">
        <Icon type="md-create" />
      </li>
      <li @click="scrollToTop"><Icon type="ios-arrow-dropup-circle" /></li>
    </ul>

    <div class="article-view-area" >
      <img class="cover-bg" v-show="articleDetail.coverBg" :src="getArticleImg">
      <h1 class="title">{{articleDetail.title}}</h1>
      <div class="author-info" v-show="!loading">
        <img :src="getAuthorAvatar">
        <div class="info-tags">
          <p>{{getUsername}}</p>
          <p class="public-time">发表于 <Time :time="getPublicTime" type="datetime" /></p>
        </div>
      </div>
      <vue-loading
        v-show="loading"
        type="bars"
        color="#009a61"
        class="loading-style"
        :size="{ width: '50px', height: '50px' }">
      </vue-loading>
      <div class="article-content" v-html="articleDetail.content"></div>
      <div class="btn-list" v-show="!loading">
        <Button :class="{'like': hasLikeArticle}" icon="ios-heart" @click="addToList('like')">赞 ｜ {{getLikeLength}}</Button>
        <Button :class="{'like': hasCollectArticle}" icon="ios-bookmark" @click="addToList('collect')">收藏 ｜ {{getCollectLength}}</Button>
      </div>
      <div class="comment-column" v-show="!loading">
        <strong>{{articleDetail.comment_num + '条评论'}}</strong>
      </div>
      <comment-panel
        v-show="!loading"
        :articleId="articleDetail._id"
        :commentList="articleDetail.commentFrom || []"
        :avatar="getUserAvatar">
      </comment-panel>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import bus from '@/common/bus.js';
import { VueLoading } from 'vue-loading-template';
import commentPanel from '../user/components/article/comment-panel';
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: { commentPanel, VueLoading },
  data () {
    return {
      loading: false,
      articleDetail: {},
      articleId: '',
      userId: '',
      userData: {}
    }
  },
  created() {
    //用户信息和文章信息通过props分开传
    if (this.id) {
      this.articleId = this.id;
    }
    else {
      this.articleId = this.$route.params.articleid;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = localStorage.getItem('userid');
    this.getDesignArticle();
    // 更新文章
    bus.$on('updateDesignArticle', () => {
      this.getDesignArticle();
    })
  },
  watch: {
    id(val) {
      if (val !== undefined) {
        this.articleId = this.id;
        this.getDesignArticle();
      }
    }
  },
  mounted () {
    $(window).scroll(this.handleScroll);
    // window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    bus.$off('updateDesignArticle');
  },
  computed: {
    getArticleImg() {
      return this.articleDetail.coverBg ? this.articleDetail.coverBg[0] : '#';
    },
    getAuthorAvatar() {
      return this.articleDetail.author ? this.articleDetail.author.avatar : '#';
    },
    getUserAvatar() {
      return this.userData.avatar;
    },
    getUserId() {
      if(JSON.stringify(this.articleDetail) === '{}') return '';
      return this.articleDetail.author._id;
    },
    getUsername() {
      if(JSON.stringify(this.articleDetail) === '{}') return '';
      return this.articleDetail.author.username;
    },
    getPublicTime() {
      if(JSON.stringify(this.articleDetail) === '{}') return new Date();
      return this.articleDetail.public_time.toString();
    },
    getLikeLength() {
      if(JSON.stringify(this.articleDetail) === '{}') return 0;
      return this.articleDetail.likeBy.length;
    },
    getCollectLength() {
      if(JSON.stringify(this.articleDetail) === '{}') return 0;
      return this.articleDetail.collectBy.length;
    },
    hasLikeArticle() {
      if(JSON.stringify(this.articleDetail) === '{}') return false;
      return this.articleDetail.likeBy.includes(this.userId);
    },
    hasCollectArticle() {
      if(JSON.stringify(this.articleDetail) === '{}') return false;
      return this.articleDetail.collectBy.includes(this.userId);
    },
  },
  methods: {
    handleScroll () {
      // var targetHeight = $(".sidebar-options").offset().top;   // 目标元素到顶部的距离
      let scrollTop = $(window).scrollTop(); // 页面滚动的距离
      if (scrollTop >= 200) {
        $(".sidebar-options").css("display","block");
      }
      else {
        $(".sidebar-options").css("display","none");
      }
    },
    scrollToComment() {
      let targetHeight = $(".comment-panel").offset().top;
      $('html').animate({
        scrollTop: targetHeight
      }, 250);//2秒滑动到指定位置
    },
    scrollToTop() {
      $('html').animate({
        scrollTop: 0
      }, 250);//2.5秒滑动到指定位置
    },
    // 点赞或收藏文章
    addToList(type) {
      // 判断操作文章的id是否是用户自己的文章
      let operator = ''
      if (type === 'like') {
        operator = this.hasLikeArticle ? 'cancel' : 'add';
      }
      else {
        operator = this.hasCollectArticle ? 'cancel' : 'add';
      }
      let data = {
        userId: this.userId,
        username: localStorage.getItem('username'),
        articleId: this.articleDetail._id,
        type: operator, // 是点赞还是取消点赞
        ownOperator: this.userData.article.includes(this.articleDetail._id) // 是否是自己操作
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
    // 转到编辑页面
    turnToEdit() {
      this.$router.push({ path: `/write/edit/${this.articleId}` });
    },
    // 请求文章相关数据的同时要更新阅读数量
    getDesignArticle() {
      if (!this.articleId) return;
      this.loading = true;
      this.axios.get('/getDesignArticle', {
        params: {
          addView: this.userData.article.includes(this.articleId),
          articleId: this.articleId
        }
      })
      .then(res => {
        this.articleDetail = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '1提示',  desc: err.message });
      })
      .finally(_=> {
        this.loading = false;
      })
    }
  }
}
</script>
