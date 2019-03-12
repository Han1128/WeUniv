<style lang="less" scoped>
.user-message-list {
  margin-top: 8rem;
  .container-left {
    float: left;
    margin-left: 13rem;
    .recept-data {
      padding: 1rem;
      border: 1px solid #d9d9d9;
      margin-bottom: 3rem;
      border-radius: .5rem;
      h2 {
        padding: .5rem;
        padding-left: 1rem;
        font-size: 1.8rem;
      }
      .ivu-divider {
        width: auto;
        margin: 0;
        clear: none;
        margin: .5rem 1rem;
      }
      .message-data {
        overflow: hidden;
        margin: 1rem 0;
        padding-left: 2rem;
        li {
          float: left;
          font-size: 1.5rem;
          margin-right: 2rem;
          text-align: center;
          border-right: 1px solid #eee;
          padding-right: 1.5rem;
        }
        & li:last-child {
          border-right: none;
        }
      }
    }
    .option-menu {
      border: 1px solid #d9d9d9;
      /deep/.movement {
        padding: 3rem 0;
      }
    }
  }
  .container {
    min-height: 50rem;
    margin-left: 38rem;
  }
}
</style>
<template>
  <div class="user-message-list">
    <g-header></g-header>
    <div class="container-left">
      <div class="recept-data">
        <h2>收到信息</h2>
        <Divider />
        <ul class="message-data">
          <li>
            {{likeCount}}<p>点赞</p>
          </li>
          <li>
            {{collectCount}}<p>收藏</p>
          </li>
          <li>
            {{commentCount}}<p>评论</p>
          </li>
        </ul>
      </div>
      <div class="option-menu">
        <Menu :active-name="activeName" @on-select="selectName">
            <MenuGroup title="未读信息">
                <MenuItem name="unReadMsg">
                    <Icon type="md-document"/>
                    未读信息
                </MenuItem>
            </MenuGroup>
            <MenuGroup class="movement" title="收到信息">
                <Submenu name="like">
                    <template slot="title">
                        <Icon type="md-heart" />
                        收到点赞
                    </template>
                    <MenuItem name="likeArticle">文章点赞</MenuItem>
                    <MenuItem name="likeComment">评论点赞</MenuItem>
                </Submenu>
                <MenuItem name="collect">
                    <Icon type="md-leaf" />
                    收到收藏
                </MenuItem>
                <MenuItem name="comment">
                    <Icon type="md-eye" />
                    收到评论
                </MenuItem>
            </MenuGroup>
        </Menu>
      </div>
    </div>
    <div class="container">
      <user-unread-message v-if="searchOption === 'unReadMsg'"></user-unread-message>
      <user-movement-msg
        v-if="['likeArticle', 'likeComment', 'collect'].includes(searchOption)"
        :searchOption="searchOption">
      </user-movement-msg>
      <user-get-comment v-if="searchOption === 'comment'"></user-get-comment>
    </div>
  </div>
</template>
<script>
import userUnreadMessage from './message/user-unread-message';
import userMovementMsg from './message/user-movement-message';
import userGetComment from './message/user-get-comment';
export default {
  components: { userUnreadMessage, userMovementMsg, userGetComment },
  data () {
    return {
      activeName: '',
      likeCount: 0,
      collectCount: 0,
      commentCount: 0,
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getMessageCount();
  },
  computed: {
    searchOption() {
      let action = this.$route.params.action;
      if (action === 'like') {
        this.activeName = 'likeArticle';
      }
      else {
        this.activeName = this.$route.params.action;
      }
      return this.activeName;
    }
  },
  methods: {
    getMessageCount() {
      this.axios.get('/getMessageCount', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.likeCount = res.data.likeCount;
        this.collectCount = res.data.collectCount;
        this.commentCount = res.data.commentCount;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    selectName(name) {
      this.$router.push({
        path: `/message/${name}`
      })
    },
  }
}
</script>
