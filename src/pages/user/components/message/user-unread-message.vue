<style lang="less" scoped>
.user-unread-list {
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
  <div class="user-unread-list">
    <h2 class="list-header">未读信息</h2>
    <Divider/>
    <ul class="collect-list">
      <li v-for="item in unReadMsg" :key="item._id">
        <div class="list-img">
          <img :src="item.from_user.avatar || defaultAvatar">
        </div>
        <div class="list-content">
          <p>
            <span class="content-author">{{item.from_user.username}}</span>
            <span style="font-weight: bold;padding-left: .5rem;">
              {{item.messageType === 'like' ? '喜欢' : item.messageType === 'collect' ? '收藏' : '评论'}}
            </span>
            了你的{{item.from_article ?  item.from_article.type === 'long' ? '文章' : '说说' : '评论'}}
            <span class="content-article">
              <!-- {{item.from_article ? item.from_article.title || item.from_article.content : item.from_comment ? '该文章已被删除' : item.from_comment.content }} -->
              {{getContent(item)}}
            </span>
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
import { DEFAULT_AVATAR } from '@/constant/index.js';
export default {
  data () {
    return {
      userId: '',
      defaultAvatar: DEFAULT_AVATAR,
      unReadMsg: []
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getUnReadMsg();
  },
  methods: {
    getContent (item) {
      return item.from_article ? item.from_article.title || item.from_article.content : item.from_comment ? item.from_comment.content : '该内容已被删除'
    },
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
