<style lang="less" scoped>
.follow-list {
  .option-menu {
    float: left;
    margin-top: 2rem;
    margin-left: 1.5rem;
    /deep/.movement {
      padding: 3rem 0;
    }
  }
  .container {
    min-height: 50rem;
    margin-left: 27rem;
    background: yellow;
  }
}
</style>
<template>
  <div class="follow-list" style="margin-top:7rem;">
    <g-header></g-header>
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
      activeName: ''
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
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
    selectName(name) {
      this.$router.push({
        path: `/message/${name}`
      })
    },
  }
}
</script>
