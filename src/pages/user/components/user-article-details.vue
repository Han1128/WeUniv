<style lang="less" scoped>
.article-details {
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
              margin-right: 6rem;
              margin-left: 1rem;
              margin-bottom: 1.5rem;
              padding: .5rem;
              border: 1px solid #eee;
              border-radius: 1rem;
              box-shadow: 0.1rem 0.1rem 4rem rgba(0, 0, 0, 0.2);
              &:hover {
                background: #FFFFE0;
              }
              .content-body {
                height: 90px;
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
                  margin-top: 1rem;
                  .ivu-icon {
                    margin-right: 0.5rem;
                  }
                }
              }
              .content-img {
                width: 120px;
                height: 90px;
                float: right;
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
}
</style>
<template>
  <div class="article-details">
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
                    <li v-for="imgUrl in item.coverBg" :key="imgUrl">
                      <img :src="imgUrl">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="card-bottom">
            <!-- 点赞 -->
            <span
              v-if="!getLikeStatus(item.author, item._id)" class="text-icon" @click="addToList('add', 'like', item._id, index)">
              <Icon type="ios-thumbs-up"/>点赞 × {{getLikeCount(item)}}
            </span>
            <span v-else class="text-icon like" @click="addToList('cancel', 'like', item._id, index)">
              <Icon type="ios-thumbs-up"/>点赞 × {{getLikeCount(item)}}
            </span>
            <!-- 评论 -->
            <span class="text-icon comment" @click="showComment(index)">
              <Icon type="md-chatboxes" />评论 {{getCommentNum(item)}}
            </span>
            <!-- 收藏 -->
            <span v-if="!getCollectStatus(item.author, item._id)" class="text-icon" @click="addToList('add', 'collect', item._id, index)">
              <Icon type="md-bookmark" />收藏 {{getCollectNum(item)}}
            </span>
            <span v-else class="text-icon collect" @click="addToList('cancel', 'collect', item._id, index)">
              <Icon type="md-bookmark" />收藏 {{getCollectNum(item)}}
            </span>
          </div>
        </div>
        <template>
          <comment-panel
            v-if="showCommentList[index]"
            :articleId="item._id"
            :commentList="item.comment"
            :avatar="item.author.avatar">
          </comment-panel>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import commentPanel from './comment-panel';

export default {
  components: { commentPanel },
  props: {
    articleDetails: {
      type: Array
    }
  },
  data () {
    return {
      commentPanel: false,
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
        return item.comment ?  item.comment.length : 0;
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
    // 判断作者是否点赞了这篇文章
    getLikeStatus(authorInfo, articleId) {
      return authorInfo.like.includes(articleId) ? true : false;
    },
    // 判断作者是否收藏了这篇文章
    getCollectStatus(authorInfo, articleId) {
      return authorInfo.collect.includes(articleId) ? true : false;
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
    addToList(operatorType, addType, articleId, index) {
      // 判断操作文章的id是否是用户自己的文章
      const userData = JSON.parse(localStorage.getItem('userData'));
      let data = {
        userId: localStorage.getItem('userid'),
        username: localStorage.getItem('username'),
        articleId,
        type: operatorType, // 是点赞还是取消点赞
        ownOperator: userData.article.includes(articleId) // 是否是自己操作
      }
      let api = addType === 'like' ? '/addLike' : '/addCollect';
      this.axios.post(api, data)
      .then(res => {
        console.log('res', res)
        this.$emit('updateOperator');
      })
      .catch(err => {
        console.log('err', err)
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
