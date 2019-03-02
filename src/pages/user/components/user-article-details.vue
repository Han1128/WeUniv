<style lang="less" scoped>
.container-left {
  width: 70rem;
  height: 100%;
  float: left;
  background: #DBDBDB;
  .panel-top {
    .ivu-menu {
      background: #D9D9D9;
    }
    .ivu-input-wrapper {
      width: 20rem;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translate(0,-50%);
    }
  }
}
</style>
<template>
  <div class="article-details">
    <div class="container-left">
      <div class="panel-top">
        <Menu mode="horizontal" :active-name="activeName" @on-select="selectName">
          <MenuItem name="all">
              <Icon type="ios-paper" />
              全部内容
          </MenuItem>
          <Submenu name="typefilter">
              <template slot="title">
                  <Icon type="ios-stats" />
                  类型筛选
              </template>
              <MenuGroup title="类型">
                  <MenuItem name="long">长文本</MenuItem>
                  <MenuItem name="short">短文本</MenuItem>
              </MenuGroup>
          </Submenu>
          <Input placeholder="Enter text" style="width: auto">
              <Icon type="ios-search" slot="suffix" />
          </Input>
        </Menu>
      </div>
      <div class="panel-content">
        <user-article-list
          :filterType="activeName"
          :articleDetails="articleDetails"
          :userDetails="userDetails"
          @updateOperator="getArticleDetails">
        </user-article-list>
      </div>
    </div>
    <div class="container-right">
    </div>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import userArticleList from './article/user-article-list'

export default {
  components: { userArticleList },
  data () {
    return {
      activeName: 'all',
      authorId: '',
      articleDetails: [],
      userDetails: {},
    }
  },
  created() {
    this.authorId = this.$route.params.userid;
    this.getAuthorInfo();
    this.getArticleDetails();
    bus.$on('updateUserData', () => {
      this.getArticleDetails();
    })
  },
  destroyed() {
    bus.$off('updateUserData');
  },
  methods: {
    selectName(name) {
      this.activeName = name;
    },
    // 获取当前作者所有文章信息 用于当前页面渲染
    getArticleDetails() {
      this.axios.get('/getUserArticles', {
        params: {
          userid: this.authorId
        }
      })
      .then(res => {
        this.articleDetails = res.data.result;
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
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
        this.$Notice.error({ title: '提示',  desc: err.message });
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
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
