<style lang="less" scoped>
.user-movement-list {
  .collect-list {
    li {
      overflow: hidden;
      .list-img {
        float: left;
        padding: .5rem 0;
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
  <div class="user-movement-list">
    <h2>{{getListTitle}}</h2>
    <template v-if="searchOption === 'likeArticle'">
      <ul class="collect-list">
        <li v-for="item in likeList" :key="item._id">
          <div class="list-img">
            <img :src="userAuthorDetails.avatar">
          </div>
          <div class="list-content">
            <p>{{userAuthorDetails.username}}</p>
            <p>
              点赞了{{item.author.username}}的
              {{item.type === 'long' ? '文章' : '说说'}}
              {{item.title || item.content}}
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
              点赞了{{item.from_author.username}}的评论 {{item.content}}
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
              收藏了{{item.author.username}}的
              {{item.type === 'long' ? '文章' : '说说'}}
              {{item.title || item.content}}
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
      return this.appellation.concat(this.searchOption === 'collect' ? '收藏' : '赞');
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
        console.log('err', err)
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
        console.log('err', err)
      })
    },
  }
}
</script>
