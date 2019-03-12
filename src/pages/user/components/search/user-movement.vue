<style lang="less" scoped>
.user-movement-list {
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
  .collect-list {
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
  <div class="user-movement-list">
    <h2 class="list-header">{{getListTitle}}</h2>
    <Divider/>
    <template v-if="searchOption === 'likeArticle'">
      <ul class="collect-list">
        <li v-for="item in likeList" :key="item._id">
          <div class="list-img">
            <img :src="userAuthorDetails.avatar">
          </div>
          <div class="list-content">
            <p>{{userAuthorDetails.username}}</p>
            <p>
              点赞了<span class="content-author">{{item.author.username}}</span>
              的{{item.type === 'long' ? '文章' : '说说'}}
              <span class="content-article">{{item.title || item.content}}</span>
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else-if="searchOption === 'likeComment'">
      <ul class="collect-list">
        <li v-for="item in likeList" :key="item._id">
          <div class="list-img">
            <img :src="userAuthorDetails.avatar">
          </div>
          <div class="list-content">
            <p>{{userAuthorDetails.username}}</p>
            <p>
              点赞了<span class="content-author">{{item.from_author.username}}</span>
              评论 <span class="content-article">{{item.content}}</span>
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="collect-list">
        <li v-for="item in collectList.collect" :key="item._id">
          <div class="list-img">
            <img :src="collectList.avatar">
          </div>
          <div class="list-content">
            <p>{{collectList.username}}</p>
            <p>
              收藏了<span class="content-author">{{item.author.username}}</span>
              的{{item.type === 'long' ? '文章' : '说说'}}
              <span class="content-article">{{item.title || item.content}}</span>
            </p>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
const R = require('ramda');
export default {
  props: {
    searchOption: {
      type: String
    },
  },
  data () {
    return {
      userId: '',
      authorId: '',
      likeList: [],
      appellation: '我的',
      collectList: {},
      userAuthorDetails: {}, // 页面作者
      userDetails: {}, // 登录用户
    }
  },
  computed: {
    getListTitle() {
      if (this.userId === this.authorId) {
        this.appellation = '我的'
      }
      else if (this.userAuthorDetails.gender) {
        this.appellation = '他的';
      }
      else {
        this.appellation = '她的';
      }
      return this.appellation.concat(this.searchOption === 'collect' ? '收藏' : '点赞');
    }
  },
  watch: {
    searchOption: {
      immediate: true, // 如果没有这句在created的时候不会执行
      handler (val) {
        this.authorId = this.$route.params.userid;
        if (val === 'collect') {
          this.getCollectList();
        }
        else {
          this.getLikeList();
        }
      }
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.authorId = this.$route.params.userid;
  },
  methods: {
    // 获取当前页作者的信息 需要展示渲染页面
    getCollectList() {
      this.axios.get('/getUserCollect', {
        params: {
          authorId: this.authorId
        }
      })
      .then(res => {
        this.collectList = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取更新登录用户的信息 用于传入子组件用来判断点赞 评论状态
    getLikeList() {
      this.axios.get('/getUserLike', {
        params: {
          authorId: this.authorId
        }
      })
      .then(res => {
        this.userAuthorDetails = R.pick(['_id', 'username', 'avatar', 'gender', 'description'])(res.data.result);
        if (this.searchOption === 'likeComment') {
          this.likeList = R.pick(['like_comment'])(res.data.result).like_comment;
        }
        else {
          this.likeList = R.pick(['like_article'])(res.data.result).like_article;
        }
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
