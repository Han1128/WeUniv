<style lang="less" scoped>
.article-list {
  .single-article {
    .article-list {
      width: auto;
      display: block;
      list-style: none;
      margin: 2rem 1rem;
      border-radius: .5rem;
      background: #fff;
      &:hover {
        background: #fff;
      }
      .card {
        width:100%;
        .card-header-img {
          width:80px;
          height:80px;
          margin: 1rem;
          border-radius: 80px;
          float:left;
          img {
            width: 8rem;
            height: 8rem;
            border-radius: 8rem;
          }
        }
        .card-center {
          padding-top: 1rem;
          margin-left: 10rem;
          .article-header {
            padding: 15px 10px;
            .user-name {
              font-size: 2rem;
              font-weight: bold;
            }
            .article-time {
              margin-top: .2rem;
              font-size: 1.2rem;
            }
          }
          .article-content {
            .long-text {
              overflow: hidden;
              margin-right: 6rem;
              margin-left: 1rem;
              margin-bottom: 1.5rem;
              padding: .5rem;
              border: 1px solid #eee;
              border-radius: 1rem;
              box-shadow: 0.1rem 0.1rem 4rem rgba(0, 0, 0, 0.2);
              position: relative;
              &:hover {
                background: #FFFFE0;
              }
              .content-body {
                min-height: 90px;
                margin-right: 120px;
                .title {
                  padding: 1rem 2rem;
                  a {
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
                .tags {
                  padding-left: 2rem;
                  margin: 1rem 0;
                  .ivu-icon {
                    margin-right: 0.5rem;
                  }
                }
              }
              .content-img {
                width: 120px;
                height: 90px;
                // float: right;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                img {
                  width: 12rem;
                  height: 9rem;
                  border-radius: .5rem;
                }
              }
            }
            .short-text {
              margin-right: 5rem;
              margin-left: 1rem;
              margin-bottom: 2rem;
              .content-body {
                min-height: 3rem;
              }
              .content-img {
                margin-top: 1rem;
                ul {
                  overflow: hidden;
                  li {
                    float: left;
                    margin-right: 2rem;
                    img {
                      width: 10rem;
                      height: 10rem;
                      cursor: zoom-in;
                    }
                  }
                }
              }
            }
          }
        }
        .card-bottom {
          background: #eee;
          height: 50px;
          line-height: 50px;
          border-radius: 0 0 0.5rem 0.5rem;
          padding-left: 3rem;
          .text-icon {
            margin-right: 3rem;
            user-select: none;
            cursor: pointer;
            &:hover {
              color: #19BE6B;
            }
          }
          .like {
            color: #19BE6B
          }
          .collect {
            color: #19BE6B
          }
          .ivu-icon {
            width: 2rem;
            font-size: 1.8rem;
            margin-right: .5rem;
          }
        }
      }
    }
  }
  .preview {
    position: fixed;
    z-index: 10000;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    .preview-show {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .skip-btn {
        font-size: 7rem;
        cursor: pointer;
        &:hover {
          color: rgba(239, 239, 239, 0.6);
        }
      }
      .turn-left {
        margin-right: 2rem;
      }
      .turn-right {
        margin-left: 2rem;
      }
    }
  }
}
</style>
<template>
  <div class="article-list">
    <ul class="single-article">
      <li class="article-list" v-for="(item,index) in articleDetails" :key="item._id" :value="item.title">
        <div class="card">
          <div class="card-header-img">
            <img :src="item.author.avatar">
          </div>
          <div class="card-center">
            <div class="article-header">
              <router-link class="user-name" tag="a" :to="'/user/' + item.author._id">{{item.author.username}}</router-link>
              <div class="article-time">
                <p><Time :time="Date.parse(item.public_time)" :type="getDateType(item.public_time)"/>发表</p>
              </div>
            </div>
            <div class="article-content">
              <!-- 长文 -->
              <div class="long-text" v-if="item.type === 'long'">
                <div class="content-img" v-if="item.coverBg[0]">
                  <img :src="item.coverBg[0]">
                </div>
                <div class="content-body">
                  <h3 class="title"><router-link tag="a" :to="'/view/' + item._id">{{item.title}}</router-link></h3>
                  <p class="tags">
                    <Icon type="md-pricetags" />
                    <Tag color="default">电影</Tag>
                    <Tag color="primary">音乐</Tag>
                    <Tag color="success">四六级</Tag>
                    <Tag color="error">社团</Tag>
                    <Tag color="warning">笔记</Tag>
                  </p>
                </div>
              </div>
              <!-- 短文 -->
        			<div class="short-text" v-else>
                <div class="content-body">
                  {{item.content}}
                </div>
                <div class="content-img">
                  <ul>
                    <li v-for="(imgUrl,index) in item.coverBg" :key="imgUrl">
                      <img :src="imgUrl" @click="showPreview(item.coverBg, index)">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <!-- 点赞 -->
            <span
              v-if="!getLikeStatus(item._id)" class="text-icon" @click="addToList('add', 'like', item._id, item.author._id)">
              <Icon type="ios-thumbs-up"/>点赞 × {{getLikeCount(item)}}
            </span>
            <span v-else class="text-icon like" @click="addToList('cancel', 'like', item._id, item.author._id)">
              <Icon type="ios-thumbs-up"/>点赞 × {{getLikeCount(item)}}
            </span>
            <!-- 评论 -->
            <span class="text-icon comment" @click="showComment(index)">
              <Icon type="md-chatboxes" />评论 {{getCommentNum(item)}}
            </span>
            <!-- 收藏 -->
            <span v-if="!getCollectStatus(item._id)" class="text-icon" @click="addToList('add', 'collect', item._id, item.author._id)">
              <Icon type="md-bookmark" />收藏 {{getCollectNum(item)}}
            </span>
            <span v-else class="text-icon collect" @click="addToList('cancel', 'collect', item._id, item.author._id)">
              <Icon type="md-bookmark" />收藏 {{getCollectNum(item)}}
            </span>
          </div>
        </div>
        <template>
          <comment-panel
            v-if="showCommentList[index]"
            :articleId="item._id"
            :author_id="item.author._id"
            :commentList="item.commentFrom"
            :avatar="userDetails.avatar">
          </comment-panel>
        </template>
      </li>
    </ul>
    <div class="preview" v-show="showPreviews" @click="hidePreview">
      <div class="preview-show">
        <Icon
          class="skip-btn turn-left"
          type="ios-arrow-dropleft-circle"
          @click.stop="showLeftImg" />
        <img :src="perviewSrc" style="cursor: zoom-out">
        <Icon
          class="skip-btn turn-right"
          type="ios-arrow-dropright-circle"
          @click.stop="showRightImg" />
      </div>
    </div>
  </div>
</template>
<script>
import commentPanel from './comment-panel';

export default {
  components: { commentPanel },
  props: {
    articleDetails: {
      type: Array
    },
    userDetails: { // 登录用户信息 localStore不能实时改变
      type: Object
    }
  },
  data () {
    return {
      commentPanel: false,
      showPreviews: false,
      perviewSrc: '',
      allPerviewImg: [],
      previewIndex: -1,
      showCommentList: []
    }
  },
  computed: {
    getLikeCount() {
      return function (item) {
        return item.likeBy ?  item.likeBy.length : 0;
      }
    },
    getCollectNum() {
      return function (item) {
        return item.collectBy ?  item.collectBy.length : 0;
      }
    },
    getCommentNum() {
      return function (item) {
        return item.commentFrom ?  item.commentFrom.length : 0;
      }
    },
  },
  created() {
    this.showCommentList = [];
  },
  methods: {
    getDateType(time) {
      return Date.parse(new Date()) - Date.parse(time) > 86400 * 3 * 1000 ? 'date' : 'relative'
    },
    // 判断用户是否点赞了这篇文章
    getLikeStatus(articleId) {
      if(!this.userDetails.like_article) return false;
      return this.userDetails.like_article.includes(articleId) ? true : false;
    },
    // 判断用户是否收藏了这篇文章
    getCollectStatus(articleId) {
      if(!this.userDetails.collect) return false;
      return this.userDetails.collect.includes(articleId) ? true : false;
    },
    // 放大图片
    showPreview(allImg, index) {
      this.showPreviews = true;
      this.perviewSrc = allImg[index];
      this.allPerviewImg = JSON.parse(JSON.stringify(allImg));
      this.previewIndex = index;
    },
    // 隐藏图片全屏
    hidePreview() {
      this.showPreviews = false;
      this.perviewSrc = '';
      this.allPerviewImg = [];
      this.previewIndex = -1;
    },
    // 向左换图
    showLeftImg() {
      if (this.previewIndex !== 0) {
        this.previewIndex = this.previewIndex - 1;
      }
      else {
        this.previewIndex = this.allPerviewImg.length - 1;
      }
      this.perviewSrc = this.allPerviewImg[this.previewIndex];
    },
    // 向右换图
    showRightImg() {
      if (this.previewIndex !== this.allPerviewImg.length - 1) {
        this.previewIndex = this.previewIndex + 1;
      }
      else {
        this.previewIndex = 0;
      }
      this.perviewSrc = this.allPerviewImg[this.previewIndex];
    },
    showComment(index) {
      if (!this.showCommentList[index]) {
        this.$set(this.showCommentList, index, true);
      }
      else {
        this.$set(this.showCommentList, index, false);
      }
    },
    /**
     * 将文章加入点赞列表中
     * @param operatorType 区分操作是点赞还是取消点赞 add是点赞 cancel是取消
     */
    addToList(operatorType, addType, articleId, authorId) {
      // 判断操作文章的id是否是用户自己的文章
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        authorId, // 文章归宿者
        articleId, // 被点赞/收藏文章id
        type: operatorType, // 是点赞还是取消点赞
      }
      let api = addType === 'like' ? '/addLike' : '/addCollect';
      this.axios.post(api, data)
      .then(res => {
        this.$emit('updateOperator');
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
