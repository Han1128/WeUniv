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
            <img :src="item.from_user.avatar">
          </div>
          <div class="list-content">
            <p>
              {{item.from_user.username}}点赞了你的
              {{item.from_article.type === 'long' ? '文章' : '说说'}}
              {{item.from_article.title || item.from_article.content}}
            </p>
            <p>
              {{item.time}}
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else-if="searchOption === 'likeComment'">
      <ul class="collect-list">
        <li v-for="item in likeList" :key="item._id">
          <div class="list-img">
            <img :src="item.from_user.avatar">
          </div>
          <div class="list-content">
           <p>
              {{item.from_user.username}}点赞了你的评论
              {{item.from_comment.content}}
            </p>
            <p>
              {{item.time}}
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="collect-list">
        <li v-for="item in collectList" :key="item._id">
          <div class="list-img">
            <img :src="item.from_user.avatar">
          </div>
          <div class="list-content">
            <p>
              {{item.from_user.username}}收藏了你的
              {{item.from_article.type === 'long' ? '文章' : '说说'}}
              {{item.from_article.title || item.from_article.content}}
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
    }
  },
  data () {
    return {
      userId: '',
      likeList: [],
      collectList: {}
    }
  },
  computed: {
    getListTitle() {
      return this.searchOption === 'collect' ? '收到的收藏' : '收到的赞';
    }
  },
  watch: {
    searchOption: {
      immediate: true, // 如果没有这句在created的时候不会执行
      handler (val) {
        this.userId = localStorage.getItem('userid');
        if (val === 'collect') {
          this.getCollectMsg();
        }
        else {
          this.getLikeMsg();
        }
      }
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
  },
  methods: {
    getCollectMsg() {
      this.axios.get('/getCollectMsg', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.collectList = res.data.result.message;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    getLikeMsg() {
      this.axios.get('/getLikeMsg', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.likeList = [];
        if (this.searchOption === 'likeComment') {
          R.map((val) => {
            if (R.has('from_comment')(val)) {
              this.likeList.push(val);
            }
          })(R.pick(['message'])(res.data.result).message)
        }
        else {
          R.map((val) => {
            if (R.has('from_article')(val)) {
              this.likeList.push(val);
            }
          })(R.pick(['message'])(res.data.result).message)
        }
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
