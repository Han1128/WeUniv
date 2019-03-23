<style lang="less" scoped>
.user-follow-page {
    width: 75%;
    margin: 0 auto;
    margin-top: 5rem;
    position: relative;
    overflow: hidden;
    .content-left {
      width: 22rem;
      height: 60rem;
      float: left;
      padding-top: 2rem;
      margin-top: 1rem;
      border-radius: .5rem;
      box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
      background: #fff;
      .ivu-icon {
        margin-right: 1rem;
      }
      .hot-topic {
        .topic-item {
          height: 3.5rem;
          line-height: 3.5rem;
          margin: 1rem 1.5rem;
          border-radius: .5rem;
          padding-left: 1.5rem;
          font-size: 1.6rem;
          cursor: pointer;
          // &:hover {
          //   background: #eee;
          // }
        }
        .active {
          background: #009a61;
          color: #fff;
        }
      }
    }
    .content-right {
      width: 30rem;
      // height: 60rem;
      float: right;
      margin-top: 1rem;
      .user-info {
        width: auto;
        height: 16rem;
        margin: 2rem;
        border-radius: .5rem;
        background: #fff;
        .user-info_header {
          padding: 1rem 2rem;
          padding-top: 2rem;
          label {
            font-size: 2rem;
            font-weight: bolder;
            margin-left: 1.5rem;
            font-family: sans-serif;
            cursor: pointer;
            &:hover {
              color: #a8a8a8;
            }
          }
          img {
            width: 6rem;
            border-radius: 6rem;
            vertical-align: middle;
          }
        }
        .user-info_follow {
          padding: .5rem 1rem;
          .follow-list {
            overflow: hidden;
            padding-left: 2rem;
            li {
              float: left;
              font-size: 1.5rem;
              margin-right: 2rem;
              text-align: center;
              border-right: 1px solid #eee;
              padding-right: 1.5rem;
            }
          }
        }
      }
      .recommend-info {
        width: auto;
        // height: 35rem;
        padding: 0 1rem;
        margin: 2rem;
        background: #fff;
        border-radius: .4rem;
        .label {
          padding: .8rem 1.2rem;
          padding-top: 1.2rem;
        }
        .divider {
          height: 1.5px;
          background: #E8EAEC;
        }
        .recommend-list {
          // margin-top: 1rem;
          li {
            // border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            // border-left: 5px solid;
            .header {
              float: left;
              height: 100%;
              margin: .5rem .5rem;
              img {
                width: 4rem;
                height: 4rem;
                border-radius: 4rem;
                margin-top: .5rem;
              }
            }
            .body {
              padding: 1rem;
              p {
                cursor: pointer;
              }
              & p:last-child {
                font-size: 1.3rem;
                .interaction {
                  margin-right: .8rem;
                  font-weight: bold;
                  .ivu-icon {
                    margin-right: .3rem;
                    vertical-align: text-bottom;
                    font-size: 1.4rem;
                  }
                }
              }
            }
            &:hover {
              background: #ccc;
            }
          }
        }
      }
    }
    .content-center {
      width: auto;
      margin-left: 24rem;
      margin-right: 30rem;
      // background: #eee;
      .center-left {
        .time-filter {
          margin: 1rem 0;
          background: #fff;
          .type-filter {
            float: right;
            li {
              float: left;
            }
          }
          .time-filter_list {
            font-size: 1.3rem;
            overflow: hidden;
            li {
              float: left;
              padding: 0 2rem;
              margin: 1rem 0;
              cursor: pointer;
              border-right: 1px solid #ccc;
            }
            & li:last-child {
              float: right;
              margin: .5rem 0;
              padding-right: .5rem;
              border-right: none;
            }
            :hover {
              color: #ccc;
              border-right: 1px solid #ccc;
            }
            .active {
              color: #009a61;
            }
          }
        }
      }
    }
}
</style>
<template>
  <div class="user-follow-page">
    <div class="content-left">
      <Divider orientation="left">快速选择</Divider>
      <ul class="hot-topic">
        <li
          :class="[{'active': selectType === 'newest'}, 'topic-item']"
          style="font-size: 1.4rem"
          @click="selectType = 'newest';getFollowArticle()">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem">
              <use xlink:href="#icon-icon--gengxin"></use>
          </svg>
          最近更新
        </li>
        <li
          :class="[{'active': selectType === 'like'}, 'topic-item']"
          style="font-size: 1.4rem"
          @click="selectType = 'like';getLikeArticle('like')">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem">
              <use xlink:href="#icon-SOCIALMEDIA"></use>
          </svg>
          我的点赞
        </li>
        <li
          :class="[{'active': selectType === 'collect'}, 'topic-item']"
          style="font-size: 1.4rem"
          @click="selectType = 'collect';getLikeArticle('collect')">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem">
              <use xlink:href="#icon-star"></use>
          </svg>
          我的收藏
        </li>
      </ul>
      <Divider orientation="left">我的标签</Divider>
      <ul class="hot-topic">
        <li
          v-for="(item, index) in userTagsList"
          :class="[{'active': selectType === item.iconLabel}, 'topic-item']"
          :key="index"
          @click="filtrerByTag(item.iconLabel)">
            <svg class="icon" aria-hidden="true" style="margin-right: 1rem;">
                <use :xlink:href="'#'+item.iconCode"></use>
            </svg>
            {{item.iconLabel}}
        </li>
        <transition name="slide">
          <router-link tag="li" class="topic-item" to="/home/tag"><Icon type="md-pricetags"/>更多标签</router-link>
        </transition>
      </ul>
    </div>
    <div class="content-right">
      <div class="user-info">
        <p class="user-info_header">
          <img :src="getUserAvatar">
          <router-link tag="label" :to="'/user/' + userDetails._id">{{userDetails.username}}</router-link>
        </p>
        <p class="user-info_follow">
          <ul class="follow-list">
            <li>
              {{following_num}}<p>关注</p>
            </li>
            <li>
              {{follower_num}}<p>粉丝</p>
            </li>
            <li>
              {{articleCount}}<p>文章</p>
            </li>
          </ul>
        </p>
      </div>

      <div class="recommend-info">
        <h4 class="label">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem;color:#FE4541">
              <use xlink:href="#icon-tubiao303"></use>
          </svg>
          你可能感兴趣的人
        </h4>
        <div class="divider"></div>
          <g-recommend-user :recommendUser="recommendUser"></g-recommend-user>
      </div>
      <div class="recommend-info">
        <h4 class="label">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem;">
            <use xlink:href="#icon-ganxingquchenggong"></use>
          </svg>
          你可能感兴趣的内容
        </h4>
        <div class="divider"></div>
        <ul class="recommend-list">
          <li v-for="item in recommendList" :key="item._id">
            <div class="header">
              <img :src="item.author.avatar">
            </div>
            <div class="body">
              <p>{{item.title}}</p>
              <p>
                <span class="interaction">
                  <Icon type="md-thumbs-up"/>{{item.likeBy.length}}
                </span>
                <span class="interaction">
                  <Icon type="md-star"/>{{item.collectBy.length}}
                </span>
                <span class="interaction">
                  <Icon type="md-chatboxes"/>{{item.commentFrom.length}}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="content-center">
      <short-text-editor @uploadUserData="getUserInfo"></short-text-editor>
      <div class="center-left">
        <div class="time-filter">
          <ul class="time-filter_list">
            <li :class="{ 'active': filterType === 'all'}" @click="filterType = 'all'">全部</li>
            <li :class="{ 'active': filterType === 'long'}" @click="filterType = 'long'">只看文章</li>
            <li :class="{ 'active': filterType === 'short'}" @click="filterType = 'short'">只看说说</li>
            <li>
              <Input search placeholder="输入搜索文章的关键词" />
            </li>
          </ul>
        </div>
        <user-article-list
          :filterType="filterType"
          :articleDetails="articleDetails"
          :userDetails="userDetails"
          @updateOperator="getUserInfo">
        </user-article-list>
      </div>
    </div>
    <g-short-text></g-short-text>
  </div>
</template>
<script>
const R = require('ramda');
import bus from '@/common/bus.js';
import mixins from '../common/mixins.js';
import { DEFAULT_AVATAR } from '@/constant/index.js';
import shortTextEditor from '../../article/components/short-text-editor';
import userArticleList from '../../user/components/article/user-article-list';
export default {
  components: { shortTextEditor, userArticleList },
  mixins: [mixins],
  data () {
    return {
      userId: '',
      filterType: 'all',
      selectType: '',
      articleDetails: [],
      userDetails: {},
      recommendList: [],
      recommendUser: [],
      userTagsList: []
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getUserInfo();
    this.getUserTags();
    // 交互操作更新
    bus.$on('updateHomeData', () => {
      this.getFollowArticle();
    })
  },
  destroyed() {
    bus.$off('updateHomeData');
  },
  computed: {
    following_num() {
      return this.userDetails.follow ? this.userDetails.follow.following_num : 0;
    },
    follower_num() {
      return this.userDetails.follow ? this.userDetails.follow.follower_num : 0;
    },
    articleCount() {
      return this.userDetails.article ? this.userDetails.article.length : 0;
    },
    getUserAvatar() {
      return this.userDetails.avatar ? this.userDetails.avatar : DEFAULT_AVATAR;
    }
  },
  methods: {
    // 通过tag筛选内容
    filtrerByTag(tagLabel) {
      this.selectType = tagLabel;
      this.axios.get('/getArticleByTag', {
        params: {
          tagLabel: tagLabel
        }
      })
      .then(res => {
        // 不能直接 = [] 来赋值无法更新视图
        this.$nextTick(_=> {
          this.articleDetails.splice(0);
          for (let item of res.data.result) {
            this.articleDetails.push(item);
          }
        })
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.userId
        }
      })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        this.userDetails = res.data.result;
        this.getFollowArticle();
        this.getRecommendArticle(); // 获得猜你喜欢文章
        this.getRecommendUser(); // 猜你喜欢用户
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 查询用户关注标签
    getUserTags() {
      this.axios.get('/getUserTags', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        this.userTagsList = res.data.userTags;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    getRecommendUser() {
      let excludeList = this.userDetails.follow.following.concat(this.userId);
      this.axios.get('/getRecommendUser', {
        params: {
          tag: this.userDetails.hobby_tags,
          excludeList,
          noFollowing: this.userDetails.follow.following_num === 0 //是否暂无关注
        }
      })
      .then(res => {
        this.recommendUser = res.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 推荐内容查询
    getRecommendArticle() {
      this.axios.get('/getRecommendArticle', {
        params: {
          userId: this.userId,
          tag: this.userDetails.hobby_tags
        }
      })
      .then(res => {
        this.recommendList = res.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取所有关注用户的文章
    getFollowArticle() {
      this.axios.get('/getFollowArticle', {
        params: {
          followList: this.userDetails.follow.following.concat(this.userDetails._id)
        }
      })
      .then(res => {
        this.articleDetails = res.data.result;
        // this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取所有点赞或关注的列表
    getLikeArticle(type) {
      this.axios.get('/getLikeArticle', {
        params: {
          likeList: type === 'like' ? this.userDetails.like_article : this.userDetails.collect
        }
      })
      .then(res => {
        this.articleDetails = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
