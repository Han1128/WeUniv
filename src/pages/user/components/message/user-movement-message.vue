<style lang="less" scoped>
.user-movement-list {
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
  .collect-list {
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
            <img :src="item.from_user.avatar || defaultAvatar">
          </div>
          <div class="list-content">
            <p v-if="item.from_article">
              <span class="content-author">{{item.from_user.username}}</span>
                点赞了你的
              {{item.from_article.type === 'long' ? '文章' : '说说'}}
              <span class="content-article">
                {{item.from_article.title || item.from_article.content}}
              </span>
            </p>
            <p v-else>
              <span>该作者文章已被删除</span>
            </p>
            <p>
              <Time :time="item.time" type="datetime" />
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
              <span class="content-author">{{item.from_user.username}}</span>
              点赞了你的评论
              <span class="content-article">
                {{item.from_comment.content}}
              </span>
            </p>
            <p>
              <Time :time="item.time" type="datetime" />
            </p>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="collect-list">
        <li v-for="item in collectList" :key="item._id">
          <div class="list-img">
            <img :src="item.from_user.avatar || defaultAvatar">
          </div>
          <div class="list-content">
            <p v-if="item.from_article">
              <span class="content-author">{{item.from_user.username}}</span>
              收藏了你的{{item.from_article.type === 'long' ? '文章' : '说说'}}
              <span class="content-article">
                {{item.from_article.title || item.from_article.content}}
              </span>
            </p>
            <p v-else>
              <span>该作者文章已被删除</span>
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
      defaultAvatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
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
    getContent (item) {
      return item.from_article ? item.from_article.title || item.from_article.content : item.from_comment ? item.from_comment.content : '该内容已被删除'
    },
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
