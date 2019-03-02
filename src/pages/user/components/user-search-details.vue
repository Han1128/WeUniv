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
                  {{appellation}}的关注
              </MenuItem>
              <MenuItem name="follower">
                  <Icon type="md-chatbubbles" />
                  {{appellation}}的粉丝
              </MenuItem>
              <MenuItem name="commonfollow" v-show="userId !== authorId">
                  <Icon type="md-chatbubbles" />
                  共同关注
              </MenuItem>
          </MenuGroup>
          <MenuGroup class="movement" title="我的动态">
              <Submenu name="like">
                  <template slot="title">
                      <Icon type="md-heart" />
                      {{appellation}}的点赞
                  </template>
                  <MenuItem name="likeArticle">点赞文章</MenuItem>
                  <MenuItem name="likeComment">点赞评论</MenuItem>
              </Submenu>
              <MenuItem name="collect">
                  <Icon type="md-leaf" />
                  {{appellation}}的收藏
              </MenuItem>
              <MenuItem name="comment">
                  <Icon type="md-eye" />
                  {{appellation}}的评论
              </MenuItem>
          </MenuGroup>
      </Menu>
    </div>
    <div class="container">
      <user-follow-list
        v-if="['following', 'follower', 'commonfollow'].includes(searchOption)"
        :authorDetails="authorDetails"
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
      userId: '',
      authorId: '',
      authorDetails: {},
      appellation: '我', // 称谓
      activeName: '',
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.authorId = this.$route.params.userid;
    this.initLabel();
    this.getAuthorInfo();
  },
  computed: {
    searchOption() {
      this.activeName = this.$route.params.search;
      return this.$route.params.search;
    }
  },
  methods: {
    // 初始化称谓
    initLabel() {
      if (this.authorId === this.userId) {
        this.appellation = '我';
      }
      else if (this.authorDetails.gender) {
        this.appellation = '他';
      }
      else {
        this.appellation = '她';
      }
    },
    // menu选项选择
    selectName(name) {
      this.$router.push({
        path: `/user/${this.authorId}/${name}`
      })
    },
    getAuthorInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.authorId
        }
      })
      .then(res => {
        this.authorDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
