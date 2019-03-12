<style lang="less" scoped>
.user-follow-list {
  .follow-list {
    margin-right: 26rem;
    margin-bottom: 2rem;
    height: 80rem;
    padding: 1rem 0;
    background: #fff;
    border: 1px solid #d9d9d9;
    box-shadow: -1px -1px 3px rgba(255, 255, 255, 0.8);
    .list-header {
      padding: 1rem;
    }
    .ivu-divider {
      margin: 0;
      margin-bottom: 1rem;
      clear: none;
    }
    .list-item {
      overflow: hidden;
      li {
        margin: 0 1rem;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: .6rem 0;
        &:hover {
          border-left: 3px solid #333;
          background: #eee;
        }
        .avatar {
          float: left;
          margin-left: .5rem;
          img {
            width: 4rem;
            border-radius: 4rem;
          }
        }
        .user-info {
          margin-left: 6rem;
          p {
            cursor: pointer;
          }
          .description {
            font-size: 1.3rem;
          }
        }
        .follow-status {
          float: right;
          margin-right: 1rem;
          margin-top: .5rem;
        }
      }
    }
  }
  .recommend-list {
    float: right;
    width: 24rem;
    height: 20rem;
    margin-top: 2rem;
    margin-right: 1rem;
    background: #fff;
    .list-header {
      padding: 1rem;
      padding-bottom: 0;
      font-size: 1.6rem;
    }
    .ivu-divider {
      margin: 1rem 0;
    }
  }
}
</style>
<template>
  <div class="user-follow-list">
    <div class="recommend-list">
      <h2 class="list-header">推荐用户</h2>
      <Divider />
    </div>
    <div class="follow-list">
      <h2 class="list-header">{{ getListTitle }}</h2>
      <Divider />
      <ul v-if="searchOption === 'following'" class="list-item">
        <li v-for="item in followinglist" :key="item._id">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="follow-status">
            <Button>取消关注</Button>
          </div>
          <div class="user-info">
            <router-link
              class="user-name"
              tag="p"
              :to="'/user/' + item._id">
              {{item.username}}
            </router-link>
            <p class="description">{{item.description}}</p>
          </div>
        </li>
      </ul>
      <ul v-else-if="searchOption === 'follower'" class="list-item">
        <li v-for="item in followerlist" :key="item._id">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="follow-status">
            <Button>已关注</Button>
          </div>
          <div class="user-info">
            <router-link
              class="user-name"
              tag="p"
              :to="'/user/' + item._id">
              {{item.username}}
            </router-link>
            <p class="description">{{item.description}}</p>
          </div>
        </li>
      </ul>
      <!-- 共同关注 -->
      <ul v-else class="list-item">
        <li v-for="item in commonFollowlist" :key="item._id">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="follow-status">
            <Button>已关注</Button>
          </div>
          <div class="user-info">
            <router-link
              class="user-name"
              tag="p"
              :to="'/user/' + item._id">
              {{item.username}}
            </router-link>
            <p class="description">{{item.description}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const R = require('ramda');
export default {
  props: {
    searchOption: {
      type: String
    },
    authorDetails: {
      type: Object
    }
  },
  data () {
    return {
      userId: '',
      authorId: '',
      appellation: '',
      userDetails: {}, // 登录用户
      followinglist: [],
      followerlist: [],
      commonFollowlist: []
    }
  },
  computed: {
    getListTitle() {
      if(this.searchOption === 'commonfollow') return '共同关注'
      if (this.userId === this.authorId) {
        this.appellation = '我的'
      }
      else if (this.authorDetails.gender) {
        this.appellation = '他的';
      }
      else {
        this.appellation = '她的';
      }
      return this.appellation.concat(this.searchOption === 'following' ? '关注' : '粉丝');
    }
  },
  watch: {
    searchOption: {
      immediate: true, // 如果没有这句在created的时候不会执行
      handler (val) {
        this.authorId = this.$route.params.userid;
        if (val === 'following') {
          this.getFollowingList();
        }
        else if (val === 'follower'){
          this.getFollowerList();
        }
      }
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.authorId = this.$route.params.userid;
    this.getUserInfo();
  },
  methods: {
    getFollowingList() {
      this.axios.get('/getFollowingList', {
        params: {
          authorId: this.authorId
        }
      })
      .then(res => {
        this.followinglist = res.data.followResult.following;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    getFollowerList() {
      this.axios.get('/getFollowerList', {
        params: {
          authorId: this.authorId
        }
      })
      .then(res => {
        this.followerlist = res.data.followResult.follower;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    getCommonFollowList() {
      if (!this.authorDetails.follow || !this.userDetails.follow) return;
      let authorFollowList = this.authorDetails.follow.following; // 当前页作者关注对象
      let userFollowList = this.userDetails.follow.following; // 登录用户的关注对象
      // 筛选相同关注
      let filterResult = R.filter(val => authorFollowList.includes(val))(userFollowList);
      this.axios.get('/getCommonFollow', {
        params: {
          idList: filterResult
        }
      })
      .then(res => {
        this.commonFollowlist = res.result;
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
      .finally(_=> {
        if (this.searchOption === 'commonfollow') {
          this.getCommonFollowList();
        }
      })
    },
  }
}
</script>
