<style lang="less" scoped>
.search-page {
  padding-top: 7rem;
  background: #F6F6F6;
  .search-content {
    width: 70%;
    margin: 0 auto;
    .header {
      text-align: center;
      margin-bottom: 2rem;
      .ivu-input-wrapper {
        width: 60rem;
        margin-right: 2rem;
        /deep/.ivu-input {
          height: 4rem;
          margin-right: 1rem;
        }
      }
      .ivu-btn {
        width: 12rem;
        height: 4rem;
        font-size: 1.5rem;
      }
    }
    .body {
      margin-top: 2rem;
      min-height: 70rem;
      // background: #fff;
      .ivu-divider {
        width: auto;
        margin: 0;
        clear: none;
        margin: 1rem 1rem;
      }
      .body-right {
        float: right;
        width: 33rem;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: .3rem;
        padding: 2rem 1.5rem;
        h2 {
          font-size: 1.8rem;
        }
        .more-content {
          float: right;
        }
        .user-list {
          li {
            overflow: hidden;
            padding-left: 1rem;
            .list-img {
              float: left;
              img {
                height: 7rem;
                border-radius: 7rem;
              }
            }
            .list-content {
              margin-left: 8rem;
              .user-name {
                font-size: 1.8rem;
                padding: .5rem;
              }
              .follow-ship {
                padding: .5rem;
              }
            }
          }
        }
      }
      .body-left {
        margin-right: 35rem;
        border: 1px solid #ccc;
        padding: 0 1rem;
        background: #fff;
        h2 {
          font-size: 1.8rem;
          padding-top: 2rem;
          padding-left: 1rem;
        }
        a {
          margin-top: 3rem;
          margin-right: 1rem;
        }
        .more-content {
          float: right;
        }
      }
    }
  }
}
</style>
<template>
  <div class="search-page">
    <g-header></g-header>
    <div class="search-content">
      <div class="header">
        <Input v-model="searchCondition"></Input>
        <Button icon="ios-search" @click="blurrySearch">搜索</Button>
      </div>
      <Menu mode="horizontal" active-name="1">
          <MenuItem name="1">
            <Icon type="ios-paper" />
            综合
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people" />
            用户
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people" />
            文章
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-construct" />
            话题
          </MenuItem>
      </Menu>
      <div class="body">
        <div class="body-right">
          <a class="more-content" href="#">查看更多</a>
          <h2>相关用户</h2>
          <Divider/>
          <ul class="user-list">
            <li v-for="item in searchUsers" :key="item._id">
              <div class="list-img">
                <img :src="item.avatar">
              </div>
              <div class="list-content">
                <p class="user-name">{{item.username}}</p>
                <p class="follow-ship">
                  {{item.follow.following_num}}<span>关注</span>
                  {{item.follow.follower_num}}<span>粉丝</span>
                  {{item.article.length}}<span>文章</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="body-left">
          <a class="more-content" href="#">查看更多</a>
          <h2>综合查询结果</h2>
          <Divider/>
          <user-article-list
            :articleDetails="searchArticles"
            :userDetails="userDetails"
            @updateOperator="blurrySearch">
          </user-article-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userArticleList from '../../user/components/article/user-article-list';
export default {
  components: { userArticleList },
  data () {
    return {
      userId: '',
      searchCondition: '',
      userDetails: {},
      searchArticles: [],
      searchUsers: []
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.searchCondition = this.$route.params.searchInfo;
    this.getUserInfo();
    this.blurrySearch();
  },
  methods: {
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.userId
        }
      })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        this.userDetails = res.data.result
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    blurrySearch() {
      this.axios.post('/blurrySearch', {
        condition: this.searchCondition
      })
      .then(res => {
        this.searchArticles = res.article;
        this.searchUsers = res.userResult;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
