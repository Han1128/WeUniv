<style lang="less" scoped>
.home-page-content {
    width: 75%;
    margin: 0 auto;
    margin-top: 5rem;
    position: relative;
    overflow: hidden;
    .content-left {
      width: 22rem;
      min-height: 60rem;
      float: left;
      padding: 1rem 0;
      margin-top: 1rem;
      background: #a6b6c6;
      border-radius: .5rem;
      box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
      background: #fff;
      .ivu-icon {
        margin-right: 1rem;
      }
      .ivu-divider {
        font-size: 15px;
        font-family: serif;
        font-weight: bolder;
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
          padding: 1rem 3rem;
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
          padding: 1.2rem 1.5rem;
          font-size: 1.5rem;
        }
        .divider {
          height: 1.5px;
          background: #E8EAEC;
        }
        .school-news-list {
          li {
            .list-index {
              float: left;
              width: 5rem;
              font-size: 3.4rem;
              text-align: center;
              margin: 2rem 0;
              margin-left: .6rem;
              color: rgba(0,0,0,.15);
            }
            .list-body {
              margin-left: 5rem;
              padding: 1rem;
              padding-left: 1.5rem;
              padding-right: 2.5rem;
              h2 {
                font-size: 1.5rem;
                margin-top: 1rem;
                margin-bottom: .2rem;
                cursor: pointer;
              }
              a {
                color: rgba(0, 0, 0, 0.5);
                font-size: 1.3rem;
              }
              p {
                cursor: pointer;
              }
              & p:last-child {
                font-size: 1.3rem;
                color: rgba(0,0,0,.45);
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
        <li :class="[{'active': filterType === 'hotTalk'}, 'topic-item']" style="font-size: 1.5rem" @click="handleLoadMore('hotTalk')">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem;color: #F46267;">
              <use xlink:href="#icon-chaojihuati-remendianjitai"></use>
          </svg>
          最近热议
        </li>
        <li :class="[{'active': filterType === 'newest'}, 'topic-item']" style="font-size: 1.5rem" @click="handleLoadMore('newest')">
          <svg class="icon" aria-hidden="true" style="margin-right: 1rem;">
              <use xlink:href="#icon-shijian"></use>
          </svg>
          近期更新
        </li>
      </ul>
      <Divider orientation="left">热门话题</Divider>
      <ul class="hot-topic">
        <li
          v-for="(item, index) in tagsList"
          :class="[{'active': filterType === item.iconLabel}, 'topic-item']"
          :key="index"
          @click="handleLoadMore(item.iconLabel)">
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
          <router-link tag="label" :to="'/user/' + userDetails._id">{{userDetails.username}}</router-link>
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
        <h4 class="label">
          <svg class="icon-mid" aria-hidden="true" style="margin-right: 1rem">
              <use xlink:href="#icon-zuozhe"></use>
          </svg>
          WeUniv优秀作者
        </h4>
        <div class="divider"></div>
        <g-recommend-user :recommendUser="recommendUser"></g-recommend-user>
      </div>
      <div class="recommend-info">
        <h4 class="label">
          <svg class="icon-mid" aria-hidden="true" style="margin-right: 1rem">
              <use xlink:href="#icon-xuexiao"></use>
          </svg>
          校内最新咨询
        </h4>
        <div class="divider"></div>
        <ul class="school-news-list">
          <li v-for="(item, index) in schoolNews" :key="item._id">
            <div class="list-index">
              {{'0' + (index + 1)}}
            </div>
            <div class="list-body">
              <router-link tag="h2" :to="'/view/' + item._id">{{item.title}}</router-link>
              <a class="body-author" href="#">{{item.author.username}}</a>
              <p>
                <span class="interaction">
                  <Icon type="md-thumbs-up"/>{{item.like_num}}
                </span>
                <span class="interaction">
                  <Icon type="md-star"/>{{item.collect_num}}
                </span>
                <span class="interaction">
                  <Icon type="md-chatboxes"/>{{item.comment_num}}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
      <div class="content-center">
        <div class="swiper">
          <!-- <vue-loading
            v-if="loading"
            type="spin"
            color="#009a61"
            :size="{ width: '50px', height: '50px' }">
          </vue-loading> -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in swiperList" :key="item._id">
              <img :src="item.coverBg[0]">
              <router-link class="title" tag="p" :to="'/view/' + item._id">{{item.title}}</router-link>
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
                @click="handleLoadMore('default')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon--morendingwei"></use>
                </svg>
                默认推荐
              </li>
              <li
                :class="{ 'active': filterType === 'week'}"
                @click="handleLoadMore('week')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhou"></use>
                </svg>
                本周热门
              </li>
              <li
                :class="{ 'active': filterType === 'month'}"
                @click="handleLoadMore('month')">
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
            @updateOperator="handleUpdate">
          </user-article-list>
          <vue-loading
            v-if="loading"
            type="bars"
            color="#009a61"
            :size="{ width: '50px', height: '50px' }">
          </vue-loading>
        </div>
      </div>
      <g-short-text></g-short-text>
      <!-- <short-text-editor></short-text-editor> -->
  </div>
</template>
<script>
import $ from 'jquery';
const R = require('ramda');
import bus from '@/common/bus.js';
import mixins from '../common/mixins.js';
import 'swiper/dist/css/swiper.css';
import { VueLoading } from 'vue-loading-template';
import { DEFAULT_AVATAR } from '@/constant/index.js';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { Swiper_Options } from '../common/index.js'
import shortTextEditor from '../../article/components/short-text-editor';
import userArticleList from '../../user/components/article/user-article-list';
export default {
  components: { swiper, swiperSlide, shortTextEditor, userArticleList, VueLoading },
  mixins: [mixins],
  data () {
    return {
      loadType: 'add', // 滚动加载还是异步更新
      skip: 0,
      limit: 5,
      bottom: false,// 是否到达底部
      userId: '',
      loading: false,
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
    this.loading = true;
    this.getHomePageDetails();
    this.getHotTags();
    // 交互操作更新
    bus.$on('updateHomeData', () => {
      this.handleUpdate()
    })
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      window.scrollTo(0,0);
    });
    $(window).scroll(this.handleScroll);
  },
  destroyed() {
    bus.$off('updateHomeData');
    this.filterType = 'default';
    $(window).off("scroll");
  },
  methods: {
    handleUpdate() {
      this.loadType = 'update';
      this.updateOperator();
    },
    // 切换挑选条件
    handleLoadMore(type) {
      if (this.filterType === type) return;
      this.articleDetails = [];
      this.filterType = type;
      this.skip = 0;
      this.limit = 5;
      this.bottom = false;
      this.updateOperator();
    },
    handleScroll() {
      let scrollTop = $(document).scrollTop(); // 页面滚动的距离
      let scrollHeight = $(document).height();
      let windowHeight = $(window).height();
      if(Math.round(scrollTop) + windowHeight == scrollHeight) {
        if (!this.loading && !this.bottom) {
          // 只有加载完成才可继续加载,避免连续触发
          this.loading = true;
          this.skip = this.skip + 5;
          this.updateOperator();
        }
      }
    },
    updateOperator() {
      if (this.filterType === 'week') {
        this.getArticleByRange('week'); // 按周
      }
      else if (this.filterType === 'month') {
        this.getArticleByRange('month'); // 按月
      }
      else if (this.filterType === 'newest') {
        this.getNewestArticle(); // 最新
      }
      else if (this.filterType === 'hotTalk') {
        this.getHotTalk(); // 热议
      }
      else if (this.filterType === 'default') {
        this.getHomePageDetails(); // 默认
      }
      else {
        this.getArticleByTag(this.filterType);
      }
    },
    // 请求主页内容
    getHomePageDetails() {
      this.axios.get('/getHomePageDetails', {
        params: {
          skip: this.loadType === 'add' ? this.skip : 0,
          limit: this.loadType === 'add' ? this.limit : Number(this.skip + this.limit)
        }
      })
      .then(res => {
        this.swiperList = res.data.defaultResult.swiperList; // 轮播图
        this.schoolNews = res.data.schoolNews; // 校内咨询
        this.recommendUser = res.data.defaultResult.recommendUser; // 推荐用户
        if (res.data.recommendArticle.length < 5) {
          // 说明到底了
          this.bottom = true;
        }
        if (this.loadType === 'add') {
          this.articleDetails = this.articleDetails.concat(res.data.recommendArticle); // 默认推荐
        }
        else {
          this.articleDetails = res.data.recommendArticle; // 默认推荐
        }
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.loading = false;
        this.loadType = 'add';
      })
    },
    // 近期更新文章
    getNewestArticle() {
      this.axios.get('/getNewestArticle', {
        params: {
          skip: this.loadType === 'add' ? this.skip : 0,
          limit: this.loadType === 'add' ? this.limit : Number(this.skip + this.limit)
        }
      })
      .then(res => {
        if (res.data.result.length < 5) {
          // 说明到底了
          this.bottom = true;
        }
        if (this.loadType === 'add') {
          this.articleDetails = this.articleDetails.concat(res.data.result); // 默认推荐
        }
        else {
          this.articleDetails = res.data.result; // 默认推荐
        }
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.loading = false;
        this.loadType = 'add';
      })
    },
    // 通过tag筛选文章
    getArticleByTag(tagLabel) {
      this.axios.get('/getArticleByTag', {
        params: {
          tagLabel: tagLabel,
          skip: this.loadType === 'add' ? this.skip : 0,
          limit: this.loadType === 'add' ? this.limit : Number(this.skip + this.limit)
        }
      })
      .then(res => {
        if (res.data.result.length < 5) {
          // 说明到底了
          this.bottom = true;
        }
        if (this.loadType === 'add') {
          this.articleDetails = this.articleDetails.concat(res.data.result); // 默认推荐
        }
        else {
          this.articleDetails = res.data.result; // 默认推荐
        }
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.loading = false;
        this.loadType = 'add';
      })
    },
    // 获取最近热议
    getHotTalk() {
      this.axios.get('/getHotTalkArticle', {
        params: {
          skip: this.loadType === 'add' ? this.skip : 0,
          limit: this.loadType === 'add' ? this.limit : Number(this.skip + this.limit)
        }
      })
      .then(res => {
        if (res.data.result.length < 5) {
          // 说明到底了
          this.bottom = true;
        }
        if (this.loadType === 'add') {
          this.articleDetails = this.articleDetails.concat(res.data.result); // 默认推荐
        }
        else {
          this.articleDetails = res.data.result; // 默认推荐
        }
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.loading = false;
        this.loadType = 'add';
      })
    },
    /**
     * 按时间查询文章
     * @param time 查询时间间隔 ''为所有 week month
     */
    getArticleByRange(time) {
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
          time: tranDate, // 时间间隔
          skip: this.loadType === 'add' ? this.skip : 0,
          limit: this.loadType === 'add' ? this.limit : Number(this.skip + this.limit)
        }
      })
      .then(res => {
        if (res.data.result.length < 5) {
          // 说明到底了
          this.bottom = true;
        }
        if (this.loadType === 'add') {
          this.articleDetails = this.articleDetails.concat(res.data.result); // 默认推荐
        }
        else {
          this.articleDetails = res.data.result; // 默认推荐
        }
        // this.$nextTick(_=> {
        //   this.articleDetails.splice(0);
        //   for (let item of res.data.result) {
        //     this.articleDetails.push(item);
        //   }
        // })
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.loading = false;
        this.loadType = 'add';
      })
    },
    // 获取最新用户信息
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.userId
        }
      })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        this.userDetails = res.data.result;
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
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.loading = false;
        this.loadType = 'add';
      })
    },
  }
}
</script>
