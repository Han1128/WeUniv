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
          width: 20rem;
          height: 20rem;
          border-radius: 20rem;
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
            font-size: 3.5rem;
            a {
              font-size: 1.5rem;
              color: #009a61;
              font-weight: normal;
              margin-left: 1rem;
            }
          }
          .baseInfo {
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
            width: 50%;
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
      height: 100rem;
      margin-top: 2rem;
      background: pink;
      .container-left {
        width: 70rem;
        height: 100%;
        float: left;
        background: #d9d9;
        .panel-top {
          .ivu-menu {
            background: #D9D9D9;
            .ivu-menu-item {
              // color: #009a61;
              // border-bottom: 2px solid #009a61;
            }
          }
          .ivu-input-wrapper {
            width: 20rem;
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translate(0,-50%);
          }
        }
        .panel-content {
        }
      }
    }
    .profile-bottom {
      height: 10rem;
      margin: 2rem 0;
      background: orange;
    }
  }

}
</style>
<template>
  <div class="user-page">
    <g-header></g-header>
    <div class="profile">
      <!-- 用户信息头部 -->
      <div class="profile-header">
        <div class="header-left">
          <Avatar :src="userAvatar"/>
        </div>
        <div class="header-right">
          <Card :bordered="false">
              <p slot="title">写一段话来介绍一下你吧~</p>
              <p>{{userDetails.description}}</p>
          </Card>
        </div>
        <div class="header-center">
          <div class="userInfo-box">
            <h2>
              {{userDetails.username}}
              <a href="#">查看完整信息</a>
            </h2>
            <div class="baseInfo">
              <p>
                <Icon type="md-mail"/>
                邮箱
                <span class="detail-info">{{userDetails.email}}</span>
              </p>
              <p>
                <Icon type="md-school"/>
                学校
                <span class="detail-info" v-if="userDetails.school">肇庆学院</span>
                <a class="suppleInfo" href="#" v-else>填写所在学校</a>
              </p>
              <p>
                <Icon type="md-person"/>
                身份
                <span class="detail-info">{{userType[userDetails.userType]}}</span>
              </p>
            </div>
            <ul class="followShip">
              <li>
                <a href="#">{{following}}</a>
                <div>关注</div>
                <p class="gap"></p>
              </li>
              <li style="border-left: 1px solid #D9D9D9;border-right: 1px solid #D9D9D9">
                <a href="#">{{follower}}</a>
                <div>粉丝</div>
              </li>
              <li>
                <a href="#">{{articleCount}}</a>
                <div>文章</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 用户信息主体 -->
      <div class="profile-container">
        <div class="container-left">
          <div class="panel-top">
            <Menu mode="horizontal" active-name="1">
              <MenuItem name="1">
                  <Icon type="ios-paper" />
                  全部内容
              </MenuItem>
              <Submenu name="2">
                  <template slot="title">
                      <Icon type="ios-stats" />
                      类型筛选
                  </template>
                  <MenuGroup title="类型">
                      <MenuItem name="3-1">长文本</MenuItem>
                      <MenuItem name="3-2">短文本</MenuItem>
                  </MenuGroup>
              </Submenu>
              <Input placeholder="Enter text" style="width: auto">
                    <Icon type="ios-search" slot="suffix" />
                </Input>
            </Menu>
          </div>
          <div class="panel-content">
            <user-article-details :articleDetails="articleDetails"></user-article-details>
          </div>
        </div>
        <div class="container-right"></div>
      </div>
      <div class="profile-bottom">

      </div>
    </div>
  </div>
</template>
<script>
import userArticleDetails from './components/user-article-details';
export default {
  components: { userArticleDetails },
  data () {
    return {
      onload: false,
      user: {
        id: '',
        name: ''
      },
      userDetails: {},
      articleDetails: [],
      userType: {
        student: '学生',
        teacher: '教师',
        institution: '机构'
      }
    }
  },
  computed: {
    following() {
      return this.userDetails.follow ? this.userDetails.follow.following_num : 0;
    },
    follower() {
      return this.userDetails.follow ? this.userDetails.follow.follower_num : 0;
    },
    articleCount() {
      return this.userDetails.article ? this.userDetails.article.length : 0;
    },
    userAvatar() {
      return this.userDetails.avatar ? this.userDetails.avatar : 'https://i.loli.net/2017/08/21/599a521472424.jpg'
    }
  },
  created() {
    this.user.id = this.$route.params.userid;
    this.getUserInfo();
    this.getArticleDetails();
  },
  methods: {
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.user.id
        }
      })
      .then(res => {
        console.log('res', res)
        this.userDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        console.log('err', err)
      })
    },
    getArticleDetails() {
      this.axios.get('/getUserArticles', {
        params: {
          userid: this.user.id
        }
      })
      .then(res => {
        console.log('res', res)
        this.articleDetails = res.data.result;
      })
      .catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>
