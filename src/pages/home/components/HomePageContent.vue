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
      height: 200rem;
      background: #007FFF;
      margin-top: 2rem;
      .center-left {
        .article-detail {
          margin: 0;
          padding: 0;
          li {
            display: block;
            list-style: none;
            width: 60%;
            height:180px;
            background: #FCF8E3;
            .image {
              display:block;
              height: 180px;
              width: 180px;
              float: right;
              background:#009A61;
            }
            .main {
              position: relative;
              margin-right: 180px;
              .title {
                padding: 10px;
                a {
                  font-size: 18px;
                  font-weight: 700px;
                  color: #333;
                  text-decoration: none;
                  &:hover {
                    text-decoration: underline;
                  }
                  &:visited {
                    color: #969696;
                  }
                }
              }
              .abstract {
                padding: 0 15px;
                p {
                  margin: 0;
                  font-size: 13px;
                  line-height: 24px;
                  color: #999;
                }
              }
              .meta {
                font-size: 12px;
                line-height: 20px;
                font-weight: 400px;
                margin-top: 10px;
                padding: 0 15px;
                a {
                  text-decoration: none;
                  color: #b4b4b4;
                  margin-right: 20px;
                  &:hover {
                    color: #787878;
                  }
                }
                p {
                  display: inline;
                }
              }
            }
          }
        }
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
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="head-right"></div>
      </div>
      <div class="content-center">
        <div class="center-left">
          <ul class="article-detail">
            <li>
                <div class="image"></div>
                <div class="main">
                  <div class="title">
                    <a href="#">大专程序员质问马云：你说招聘从不看文凭，为何我投阿里石沉大海</a>
                  </div>
                  <div class="abstract">
                    <p>
                      在互联网职业分享社区，一名大专程序员对马云发出了质问：你说招聘从不看文凭，为啥我投阿里的简历石沉大海，我同学浙大投了马上就有面试？很显然，这名大...
                    </p>
                  </div>
                  <div class="meta">
                    <a href="">Java入门到入坟</a>
                    <p>刚刚</p>
                  </div>
                </div>
            </li>
          </ul>
        </div>
        <div class="center-right"></div>
      </div>
      <short-text-editor></short-text-editor>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import shortTextEditor from '../../article/components/short-text-editor';
export default {
  components: { swiper, swiperSlide, shortTextEditor },
  data () {
    return {
      value2: 0,
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
  mounted() {
    console.log('this is current swiper instance object', this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  methods: {
  }
}
</script>
