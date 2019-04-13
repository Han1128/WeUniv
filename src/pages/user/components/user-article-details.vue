<style lang="less" scoped>
.article-details {
  .container-left {
    width: 70rem;
    height: 100%;
    float: left;
    // background: #DBDBDB;
    .panel-top {
      border: 1px solid #d8d8d8;
      box-shadow: -1px -1px 5px #d9d9d9;
      .ivu-menu {
        border-radius: 0.5rem;
        font-size: 1.4rem;
        z-index: 1;
      }
      .ivu-input-wrapper {
        width: 20rem;
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translate(0,-50%);
      }
    }
    /deep/.ivu-page {
      text-align: center;
    }
  }
  .container-right {
    margin-left: 71rem;
    // height: 60rem;
    // background: pink;
    .gallery {
      min-height: 30rem;
      background: #fff;
      border: 1px solid #d9dd99;
      box-shadow: 1px 1px 12px rgba(0,0,0,0.2);
      h3 {
        font-size: 1.8rem;
        padding: 1rem 2rem;
        border-bottom: 1px solid #d8d8d8;
        a {
          float: right;
          font-size: 1.4rem;
          padding-top: .2rem;
        }
      }
      .gallery-list {
        .long {
          width: 100%;
          padding: .5rem;
        }
        .short {
          height: 16rem;
          margin: .5rem 0;
          margin-left: 1rem;
        }
      }
    }
  }
}

</style>
<template>
  <div class="article-details">

    <div class="container-left">
      <div class="panel-top">
        <Menu mode="horizontal" :active-name="activeName" @on-select="selectName">
          <MenuItem name="all">
              <Icon type="ios-paper" />
              全部内容
          </MenuItem>
          <Submenu name="typefilter">
              <template slot="title">
                  <Icon type="ios-stats" />
                  类型筛选
              </template>
              <MenuGroup title="类型">
                  <MenuItem name="long">长文本</MenuItem>
                  <MenuItem name="short">短文本</MenuItem>
              </MenuGroup>
          </Submenu>
          <MenuItem name="gallery">
              <Icon type="ios-paper" />
              照片墙
          </MenuItem>
          <i-input v-model="searchContent" placeholder="Enter text" style="width: auto">
              <Icon type="ios-search" slot="suffix" @click="getArticleSearch"/>
          </i-input>
        </Menu>
      </div>
      <div class="panel-content">
        <user-article-list
          v-if="activeName !== 'gallery'"
          :filterType="activeName"
          :articleDetails="articleDetails"
          :userDetails="userDetails"
          @updateOperator="getUpdateArticle">
        </user-article-list>
        <article-gallery-list v-else :galleryList="galleryList"></article-gallery-list>
      </div>
      <div style="margin: 2rem 0">
        <Page
          v-show="activeName !== 'gallery' && searchContent === ''"
          :total="totalNums"
          :current.sync="currentPage"
          show-elevator
          @on-change="getUpdateArticle"/>
      </div>
    </div>

    <div class="container-right">
      <div class="gallery">
        <h3>相册<a href="#" class="more" @click="pushToGallery">查看更多</a></h3>
        <div class="gallery-list">
          <img
            class="gallery-img short"
            v-for="(item, index) in briefShortList"
            :key="item" :src="item"
            v-show="index < 2">
          <img
            class="gallery-img long"
            v-for="(item, index) in briefLongList"
            :key="item" :src="item"
            v-show="index < 2">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const R = require('ramda');
import bus from '@/common/bus.js';
import userArticleList from './article/user-article-list'
import articleGalleryList from './article/article-gallery-list'

export default {
  components: { userArticleList, articleGalleryList },
  data () {
    return {
      totalNums: 0,
      currentPage: 1,
      activeName: 'all',
      authorId: '',
      searchContent: '',
      articleDetails: [],
      userDetails: {},
      galleryList: [],
      briefShortList: [],
      briefLongList: []
    }
  },
  created() {
    this.authorId = this.$route.params.userid;
    this.getAuthorInfo();
    this.getArticleDetails();
    this.getUserGallery();
    bus.$on('updateUserData', () => {
      this.getUpdateArticle();
      this.getUserGallery();
    })
  },
  destroyed() {
    bus.$off('updateUserData');
  },
  methods: {
    selectName(name) {
      this.activeName = name;
      if (name === 'all') {
        this.searchContent = '';
        this.getArticleDetails();
      }
    },
    pushToGallery() {
      this.activeName = 'gallery';
    },
    getUpdateArticle() {
      if (this.searchContent !== '') {
        this.getArticleSearch()
      }
      else {
        this.getArticleDetails()
      }
    },
    // 获取当前作者所有文章信息 用于当前页面渲染
    getArticleDetails() {
      this.axios.get('/getUserArticles', {
        params: {
          userid: this.authorId,
          limit: 10,
          skip: (this.currentPage - 1) * 10
        }
      })
      .then(res => {
        this.articleDetails = res.data.result;
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 文章搜索
    getArticleSearch() {
      if (!this.searchContent) return this.$Notice.error({ title: '提示',  desc: '请输入查询条件' })
      this.axios.get('/getSearchArticles', {
        params: {
          userid: this.authorId,
          search: this.searchContent,
          limit: 10,
          skip: (this.currentPage - 1) * 10
        }
      })
      .then(res => {
        // this.activeName = '';
        this.articleDetails = res.data.result;
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取当前页作者的信息 需要展示渲染页面
    getAuthorInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.authorId
        }
      })
      .then(res => {
        this.userAuthorDetails = JSON.parse(JSON.stringify(res.data.result));
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
        this.totalNums = this.userDetails.article.length;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取相册列表
    getUserGallery() {
      this.axios.get('/getUserGallery', {
        params: {
          userId: this.authorId
        }
      })
      .then(res => {
        let filterArr = R.filter(val => val.coverBg.length !== 0)(res.result);
        this.galleryList[0] = R.filter(val => val.type === 'short')(filterArr);
        this.briefShortList = R.flatten(R.pluck('coverBg')(this.galleryList[0]));
        this.galleryList[1] = R.filter(val => val.type === 'long')(filterArr);
        this.briefLongList = R.flatten(R.pluck('coverBg')(this.galleryList[1]));
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
