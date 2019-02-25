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
  <div class="follow-list">
    <div class="option-menu">
      <Menu :active-name="activeName" @on-select="selectName">
          <MenuGroup title="关系管理">
              <MenuItem name="following">
                  <Icon type="md-document" />
                  我的关注
              </MenuItem>
              <MenuItem name="follower">
                  <Icon type="md-chatbubbles" />
                  我的粉丝
              </MenuItem>
          </MenuGroup>
          <MenuGroup class="movement" title="我的动态">
              <Submenu name="like">
                  <template slot="title">
                      <Icon type="md-heart" />
                      我的点赞
                  </template>
                  <MenuItem name="likeArticle">点赞文章</MenuItem>
                  <MenuItem name="likeComment">点赞评论</MenuItem>
              </Submenu>
              <MenuItem name="collect">
                  <Icon type="md-leaf" />
                  我的收藏
              </MenuItem>
              <MenuItem name="comment">
                  <Icon type="md-eye" />
                  我的评论
              </MenuItem>
          </MenuGroup>
      </Menu>
    </div>
    <div class="container">
      <user-follow-list
        v-if="['following', 'follower'].includes(searchOption)"
        :searchOption="searchOption">
      </user-follow-list>
      <user-movement
        v-if="['likeArticle', 'likeComment', 'collect'].includes(searchOption)"
        :searchOption="searchOption">
      </user-movement>
      <user-comment v-if="searchOption === 'comment'"></user-comment>
    </div>
  </div>
</template>
<script>
import userComment from './search/user-comment'
import userFollowList from './search/user-follow-list';
import userMovement from './search/user-movement';
export default {
  components: { userFollowList, userMovement, userComment },
  data () {
    return {
      authorId: '',
      activeName: '',
      userAuthorDetails: {}, // 页面作者
      userDetails: {}, // 登录用户
    }
  },
  created() {
    this.authorId = this.$route.params.userid;
    this.getAuthorInfo();
    this.getUserInfo();
  },
  computed: {
    searchOption() {
      this.activeName = this.$route.params.search;
      return this.$route.params.search;
    }
  },
  methods: {
    selectName(name) {
      this.$router.push({
        path: `/user/${this.authorId}/${name}`
      })
    },
    // 获取当前页作者的信息 需要展示渲染页面
    getAuthorInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.authorId
        }
      })
      .then(res => {
        this.userAuthorDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        console.log('err', err)
      })
    },
    // 获取更新登录用户的信息 用于传入子组件用来判断点赞 评论状态
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: localStorage.getItem('userid')
        }
      })
      .then(res => {
        this.userDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        console.log('err', err)
      })
    },
  }
}
</script>
