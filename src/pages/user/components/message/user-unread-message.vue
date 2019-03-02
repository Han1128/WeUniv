<style lang="less" scoped>
.user-unread-list {
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
  <div class="user-unread-list">
    <h2>未读信息</h2>
    <ul class="collect-list">
      <li v-for="item in unReadMsg" :key="item._id">
        <div class="list-img">
          <img :src="item.from_user.avatar">
        </div>
        <div class="list-content">
          <p>
            {{item.from_user.username}}{{item.messageType === 'like' ? '喜欢' : item.messageType === 'collect' ? '收藏' : '评论'}}
            了你的{{item.from_article ?  item.from_article.type === 'long' ? '文章' : '说说' : '评论'}}
            {{item.from_article ? item.from_article.title || item.from_article.content : item.from_comment.content }}
          </p>
          <p>
            <Time :time="item.time" type="datetime" />
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
      unReadMsg: []
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getUnReadMsg();
  },
  methods: {
    getUnReadMsg() {
      this.axios.get('/getUnReadMsg', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.unReadMsg = res.data.result.message;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
