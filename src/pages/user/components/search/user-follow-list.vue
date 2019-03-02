<style lang="less" scoped>
.user-follow-list {
  .follow-list {
    margin-right: 27rem;
    background: cadetblue;
    height: 80rem;
    .list-item {
      overflow: hidden;
      li {
        background: #cece;
        padding: .6rem 0;
        border-bottom: 1px solid #ccc;
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
          .description {
            font-size: 1.3rem;
          }
        }
        .follow-status {
          float: right;
        }
      }
    }
  }
  .recommend-list {
    float: right;
    width: 25rem;
    height: 20rem;
    background: mediumspringgreen;
  }
}
</style>
<template>
  <div class="user-follow-list">
    <div class="recommend-list">
      <h2>推荐用户</h2>
    </div>
    <div class="follow-list">
      <h2>{{ getListTitle }}</h2>
      <ul v-if="searchOption === 'following'" class="list-item">
        <li v-for="item in followinglist" :key="item._id">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="follow-status">
            <Button>取消关注</Button>
          </div>
          <div class="user-info">
            <p>{{item.username}}</p>
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
            <p>{{item.username}}</p>
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
            <p>{{item.username}}</p>
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
