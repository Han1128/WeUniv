<style lang="less" scoped>
.home-page-content {
    width: 80%;
    // height: 152rem;
    // min-height: 152rem;
    margin: 0 auto;
    margin-top: 5rem;
    position: relative;
    .content-head {
      height: 40rem;
      background: #fff;
      .head-left {
        width: 60%;
        float: left;
        height: 100%;
        margin-right: 2rem;
        background: #FCF8E3;
        /deep/.swiper-container-horizontal {
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 40rem;
          .swiper-slide {
            img {
              width: 100%;
              height: 100%;
            }
            p {
              position: absolute;
              bottom: 0;
              height: 5rem;
              line-height: 5rem;
              color: #fff;
              width: 100%;
              font-weight: bold;
              font-size: 2rem;
              background: rgba(239,239,239,0.4);
              cursor: pointer;
            }
          }
        }
      }
      .head-right {
        height: 100%;
        overflow: hidden;
        background: #009A61;
      }
    }
    .content-center {
      width: 100%;
      // height: 200rem;
      background: #007FFF;
      margin-top: 2rem;
      .center-left {
        width: 60%;

      }
    }
}
</style>
<template>
  <div class="home-page-content">
      <div class="content-head">
        <div class="head-left">
          <!-- swiper -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <img :src="articleDetails[6].coverBg[0]">
              <p>这是文章介绍</p>
            </swiper-slide>
            <swiper-slide>
              <img :src="articleDetails[1].coverBg[0]">
            </swiper-slide>
            <swiper-slide>
              <img :src="articleDetails[4].coverBg[0]">
            </swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="head-right">
        </div>
      </div>
      <div class="content-center">
        <div class="center-left">
          <user-article-list
            :articleDetails="articleDetails"
            :userDetails="userDetails"
            @updateOperator="getHomePageArticle"></user-article-list>
        </div>
        <div class="center-right"></div>
      </div>
      <g-short-text></g-short-text>
      <!-- <short-text-editor></short-text-editor> -->
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import shortTextEditor from '../../article/components/short-text-editor';
import userArticleList from '../../user/components/article/user-article-list';
export default {
  components: { swiper, swiperSlide, shortTextEditor, userArticleList },
  data () {
    return {
      userId: '',
      articleDetails: [],
      userDetails: {},
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          // clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getUserInfo();
    this.getHomePageArticle();
    bus.$on('uploadUserData', () => {
      this.getHomePageArticle();
    })
  },
  destroyed() {
    bus.$off('uploadUserData');
  },
  mounted() {
    console.log('this is current swiper instance object', this.swiper);
    this.swiper.slideTo(3, 1000, false);
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
    getHomePageArticle() {
      this.axios.get('/getHomePageArticle', {
        params: {
          userId: this.userId
        }
      })
      .then(res => {
        console.log('res', res)
        this.articleDetails = res.data.result;
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
