<style lang="less" scoped>
.user-page {
  width: 100%;
  height: 100%;
  .profile {
    width: 70%;
    margin: 0 auto;
    margin-top: 7rem;
    .profile-header {
      width: 100%;
      height: 30rem;
      background: #F6F6F6;
      .header-left {
        float: left;
        width: 30rem;
        height: 100%;
        background: #F6F6F6;
        position: relative;
        .ivu-avatar {
          width: 17rem;
          height: 17rem;
          border-radius: 17rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .header-center {
        height: 100%;
        margin-left: 30rem;
        margin-right: 35rem;
        background: #F6F6F6;
        position: relative;
        a {
          color: #009a61;
        }
        .userInfo-box {
          width: 100%;
          height: 100%;
          padding-top: 4.5rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          h2 {
            white-space: nowrap;
            font-size: 3.5rem;
            a {
              font-size: 1.5rem;
              color: #009a61;
              font-weight: normal;
              margin-left: 1rem;
            }
          }
          .baseInfo {
            white-space: nowrap;
            margin-left: .5rem;
            p{
              margin-top: 1rem;
              font-size: 1.5rem;
              /deep/.ivu-icon {
                font-size: 1.8rem;
                margin-right: .5rem;
                margin-bottom: .2rem;
              }
              .suppleInfo {
                margin-left: 2.5rem;
                color: #009a61;
              }
              .detail-info {
                margin-left: 2.5rem;
              }
            }
          }
          .followShip {
            margin: 1.5rem 0;
            overflow: hidden;
            width: 20rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #D9D9D9;
            li {
              float: left;
              font-size: 1.5rem;
              padding: 0 1.5rem;
              text-align: center;
              div {
                margin-top: 0.5rem;
              }
            }
          }
        }
      }
      .header-right {
        float: right;
        width: 35rem;
        height: 100%;
        padding-top: 5.5rem;
        position: relative;
        .ivu-card {
          width: 30rem;
          height: 20rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          box-shadow: 0 .1rem .6rem rgba(0,0,0,.2);
          border-color: #eee;
          cursor: pointer;
          &:hover {
            box-shadow: .2rem .2rem .5rem .5rem rgba(0,0,0,.2);
          }
        }
      }
    }
    .profile-container {
      margin-top: 2rem;
      // background: pink;
      overflow: hidden;
    }
    .profile-bottom {
      height: 10rem;
      margin: 2rem 0;
      // background: orange;
    }
  }

}
</style>
<template>
  <div class="user-page">
    <g-header></g-header>
    <g-short-text></g-short-text>
    <div class="profile">
      <!-- 用户信息头部 -->
      <div class="profile-header">
        <div class="header-left">
          <Avatar :src="userAvatar"/>
        </div>
        <div class="header-right">
          <Card :bordered="false">
              <p slot="title">写一段话来介绍一下你吧~</p>
              <p>{{authorDetails.description}}</p>
          </Card>
        </div>
        <div class="header-center">
          <div class="userInfo-box">
            <h2>
              {{authorDetails.username}}
              <Button
                v-if="authorId !== userDetails._id"
                @click="changFollowShip">{{fllowShip}}</Button>
              <a href="#">查看完整信息</a>
            </h2>
            <div class="baseInfo">
              <p>
                <Icon type="md-mail"/>
                邮箱
                <span class="detail-info">{{authorDetails.email}}</span>
              </p>
              <p>
                <Icon type="md-school"/>
                学校
                <span class="detail-info" v-if="authorDetails.school">肇庆学院</span>
                <a class="suppleInfo" href="#" v-else>填写所在学校</a>
              </p>
              <p>
                <Icon type="md-person"/>
                身份
                <span class="detail-info">{{userType[authorDetails.userType]}}</span>
              </p>
            </div>
            <ul class="followShip">
              <li>
                <router-link tag="a" :to="'/user/' + authorId + '/search/following'">
                    {{following}}
                </router-link>
                <div>关注</div>
                <p class="gap"></p>
              </li>
              <li style="border-left: 1px solid #D9D9D9;border-right: 1px solid #D9D9D9">
                <router-link tag="a" :to="'/user/' + authorId + '/search/follower'">
                    {{follower}}
                </router-link>
                <div>粉丝</div>
              </li>
              <li>
                <router-link tag="a" :to="'/user/' + authorId">
                    {{articleCount}}
                </router-link>
                <div>文章</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 用户信息主体 -->
      <div class="profile-container">
        <router-view :key="$route.fullPath"></router-view>
      </div>
      <div class="profile-bottom">
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import { DEFAULT_AVATAR } from '@/constant/index.js';
import userArticleDetails from './components/user-article-details';
import shortTextEditor from '@/pages/article/components/short-text-editor';
export default {
  components: { userArticleDetails, shortTextEditor },
  data () {
    return {
      onload: false,
      authorId: '',
      fllowShip: '关注', // 关注状态
      authorDetails: {}, // 页面作者
      userDetails: {}, // 登录用户
      userType: {
        student: '学生',
        teacher: '教师',
        institution: '机构'
      }
    }
  },
  computed: {
    following() {
      return this.authorDetails.follow ? this.authorDetails.follow.following_num : 0;
    },
    follower() {
      return this.authorDetails.follow ? this.authorDetails.follow.follower_num : 0;
    },
    articleCount() {
      return this.authorDetails.article ? this.authorDetails.article.length : 0;
    },
    userAvatar() {
      return this.authorDetails.avatar ? this.authorDetails.avatar : DEFAULT_AVATAR
    }
  },
  created() {
    this.authorId = this.$route.params.userid;
    this.getAuthorInfo();
    this.getUserInfo();
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.authorId = to.params.userid;
      this.getAuthorInfo();
      this.getUserInfo();
    }
  },
  methods: {
    // 获取关注状态
    getFollowStatus() {
      // 四种状态 互相关注 被关注 关注 无关系
      if(!this.userDetails.follow) return '关注';
      if (this.userDetails.follow.follower.includes(this.authorId) && this.userDetails.follow.following.includes(this.authorId)) {
        this.fllowShip = '互相关注';
      }
      else if (this.userDetails.follow.following.includes(this.authorId)) {
        this.fllowShip = '已关注';
      }
      else {
        // 被关注或无关系
        this.fllowShip = '关注';
      }
    },
    changFollowShip() {
      let Msg = ['互相关注', '已关注'].includes(this.fllowShip) ? '取消关注' : '关注';
      this.$Modal.confirm({
        title: '操作提示',
        content: `<p>是否确定${Msg}该用户？</p>`,
        onOk: () => {
          const api = Msg === '关注' ? '/addFllowShip' : '/removeFollowShip';
          this.axios.post(api, {
            userId: this.userDetails._id,
            followId: this.authorDetails._id
          })
          .then(res => {
            this.$Notice.success({ title: '提示',  desc: '更新状态成功!' });
            this.getAuthorInfo();
            this.getUserInfo();
          })
          .catch(err => {
            console.log('err', err)
          })
        }
      });
    },
    // 获取当前页作者的信息 需要展示渲染页面
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
      .finally( _=> {
        this.getFollowStatus();
      })
    },
  }
}
</script>
