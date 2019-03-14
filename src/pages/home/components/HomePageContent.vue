<style lang="less" scoped>
.home-page-content {
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
      background: #a6b6c6;
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
          &:hover {
            background: #eee;
          }
        }
      }
    }
    .content-right {
      width: 28rem;
      height: 60rem;
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
              cursor: pointer;
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
        .recommend-user {
          li {
            overflow: hidden;
            padding: 1rem;
            img {
              width: 4rem;
              float: left;
              margin-left: .5rem;
              border-radius: 5rem;
            }
            .recommend-user-details {
              margin-left: 6rem;
            }
            &:hover {
              background: #eee;
            }
          }
        }
        .recommend-list {
          margin-top: 1rem;
          li {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            border-left: 5px solid;
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
      .swiper {
        padding: 1rem 0;
        .swiper-container {
          height: 30rem;
          .swiper-slide {
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
            .title {
              width: 100%;
              height: 5rem ;
              text-align: center;
              position: absolute;
              bottom: 0;
              color: #fff;
              line-height: 5rem;
              font-weight: bold;
              font-size: 2rem;
              background: rgba(239,239,239,0.4);
              cursor: pointer;
            }
          }
        }
      }
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
  <div class="home-page-content">
    <div class="content-left">
      <Divider orientation="left">快速选项</Divider>
      <ul class="hot-topic">
        <li class="topic-item" style="font-size: 1.5rem" @click="getHotTalk">
          <Icon type="md-flame" />最近热议
        </li>
        <li class="topic-item" style="font-size: 1.5rem" @click="getNewestArticle">
          <Icon type="ios-timer-outline" />近期更新
        </li>
      </ul>
      <Divider orientation="left">热门话题</Divider>
      <ul class="hot-topic">
        <li
          class="topic-item"
          v-for="(item, index) in tagsList"
          :key="index"
          @click="getArticleByTag(item.iconLabel)">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem">
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
          <label>{{userDetails.username}}</label>
        </p>
        <p class="user-info_follow">
          <ul class="follow-list">
            <router-link tag="li" :to="'/user/' + userId + '/search/following'">
                {{following_num}}<p>关注</p>
            </router-link>
            <router-link tag="li" :to="'/user/' + userId + '/search/follower'">
                {{follower_num}}<p>粉丝</p>
            </router-link>
            <router-link tag="li" :to="'/user/' + userId">
                {{articleCount}}<p>文章</p>
            </router-link>
          </ul>
        </p>
      </div>
      <div class="recommend-info">
        <h4 class="label">WeUniv优秀作者</h4>
        <div class="divider"></div>
        <ul class="recommend-user">
          <li v-for="item in recommendUser" :key="item._id">
            <img :src="item.avatar || defaultAvatar">
            <div class="recommend-user-details">
              <p>
                <span>{{item.username}}</span>
                <span>
                  {{item.userType === 'student' ? '学生' : item.userType === 'teacher' ? '教师' : '机构'}}
                </span>
              </p>
              <p>已经写下{{item.article.length}}篇文章</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="recommend-info">
        <h4 class="label">校内最新咨询</h4>
        <div class="divider"></div>
        <ul class="recommend-list">
          <li v-for="item in schoolNews" :key="item._id">
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
        <div class="swiper">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in swiperList" :key="item._id">
              <img :src="item.coverBg[0]">
              <p class="title">{{item.title}}</p>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="center-left">
          <div class="time-filter">
            <ul class="time-filter_list">
              <li
                :class="{ 'active': filterType === 'default'}"
                @click="getHomePageDetails()">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon--morendingwei"></use>
                </svg>
                默认推荐
              </li>
              <li
                :class="{ 'active': filterType === 'week'}"
                @click="getArticleByRange('week')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhou"></use>
                </svg>
                本周热门
              </li>
              <li
                :class="{ 'active': filterType === 'month'}"
                @click="getArticleByRange('month')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yue"></use>
                </svg>
                本月热门
              </li>
            </ul>
          </div>
          <user-article-list
            :articleDetails="articleDetails"
            :userDetails="userDetails"
            @updateOperator="updateOperator">
          </user-article-list>
        </div>
      </div>
      <g-short-text></g-short-text>
      <!-- <short-text-editor></short-text-editor> -->
  </div>
</template>
<script>
const R = require('ramda');
import bus from '@/common/bus.js';
import 'swiper/dist/css/swiper.css';
import { DEFAULT_AVATAR } from '@/constant/index.js';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Swiper_Options } from '../common/index.js'
import shortTextEditor from '../../article/components/short-text-editor';
import userArticleList from '../../user/components/article/user-article-list';
export default {
  components: { swiper, swiperSlide, shortTextEditor, userArticleList },
  data () {
    return {
      userId: '',
      filterType: 'default',
      onlyShort: false,
      onlyLong: false,
      articleDetails: [], // 主页文章显示内容
      userDetails: {}, // 登录用户信息
      recommendList: [], // 猜你喜欢
      tagsList: [], // 标签话题列表
      swiperList: [], // 轮播图文章
      recommendUser: [], // 推荐用户
      schoolNews: [], // 校内咨询
      swiperOption: Swiper_Options,
      defaultAvatar: DEFAULT_AVATAR
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
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
      return this.userDetails.avatar ? this.userDetails.avatar : DEFAULT_AVATAR
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getHomePageDetails();
    // this.getHomePageDetails();
    this.getHotTags();
    // 交互操作更新
    bus.$on('updateHomeData', () => {
      debugger
      if (this.filterType === 'week') {
        this.getArticleByRange('week');
      }
      else if (this.filterType === 'month') {
        this.getArticleByRange('month');
      }
      else {
        this.getHomePageDetails();
      }
    })
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  },
  destroyed() {
    bus.$off('updateHomeData');
    this.filterType = 'default';
  },
  methods: {
    updateOperator() {
      if (this.filterType === 'week') {
        this.getArticleByRange('week');
      }
      else if (this.filterType === 'month') {
        this.getArticleByRange('month');
      }
      else {
        this.getHomePageDetails();
      }
    },
    // 请求主页内容
    getHomePageDetails() {
      this.axios.get('/getHomePageDetails', {})
      .then(res => {
        this.swiperList = res.data.defaultResult.swiperList; // 轮播图
        this.articleDetails = res.data.recommendArticle; // 默认推荐
        this.schoolNews = res.data.schoolNews; // 校内咨询
        this.recommendUser = res.data.defaultResult.recommendUser; // 推荐用户
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.getUserInfo();
      })
    },
    // 近期更新文章
    getNewestArticle() {
      this.axios.get('/getNewestArticle', {})
      .then(res => {
        this.articleDetails = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 通过tag筛选文章
    getArticleByTag(tagLabel) {
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
        // this.getRecommendArticle(); // 获得猜你喜欢文章
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取热门标签
    getHotTags() {
      this.axios.get('/getHotTags', {})
      .then(res => {
        this.tagsList = res.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取最近热议
    getHotTalk() {
      this.axios.get('/getHotTalkArticle', {})
      .then(res => {
        this.articleDetails = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 推荐内容查询
    // getRecommendArticle() {
    //   this.axios.get('/getRecommendArticle', {
    //     params: {
    //       userId: this.userId,
    //       tag: this.userDetails.hobby_tags
    //     }
    //   })
    //   .then(res => {
    //     this.recommendList = res.result;
    //   })
    //   .catch(err => {
    //     this.$Notice.error({ title: '提示',  desc: err.message });
    //   })
    // },
    /**
     * 按时间查询文章
     * @param time 查询时间间隔 ''为所有 week month
     */
    getArticleByRange(time) {
      this.filterType = time;
      let nowDate = new Date();
      let tranDate = ''
      if (time === 'week') {
        tranDate = new Date(nowDate - 7*24*3600*1000);
      }
      else if (time === 'month') {
        tranDate = new Date(nowDate.setMonth(nowDate.getMonth()-1));
      }
      else {
        tranDate = nowDate
      }
      this.axios.get('/getArticleByRange', {
        params: {
          time: tranDate // 时间间隔
        }
      })
      .then(res => {
        // this.articleDetails = res.data.result;
        this.$nextTick(_=> {
          this.articleDetails.splice(0);
          for (let item of res.data.result) {
            this.articleDetails.push(item);
          }
        })
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
