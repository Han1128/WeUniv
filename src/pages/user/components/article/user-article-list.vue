<style lang="less" scoped>
.article-list {
  .single-article {
    .article-list-details {
      width: auto;
      display: block;
      list-style: none;
      margin: 2rem 0;
      border-radius: .5rem;
      background: #fff;
      &:hover {
        background: #fff;
      }
      .card {
        width:100%;
        border-radius: .5rem;
        border: 1.5px solid #dedede;
        box-shadow: -1px 0 1px rgba(255, 255, 255, 0.8);
        .card-header-img {
          width: 8rem;
          height: 6rem;
          margin: 2rem 1rem;
          border-radius: 80px;
          float: left;
          text-align: center;
          img {
            width: 6rem;
            height: 6rem;
            border-radius: 6rem;
          }
        }
        .card-center {
          padding-top: 1rem;
          margin-left: 9rem;
          margin-bottom: 1.5rem;
          .article-header {
            padding: 1.5rem 1rem;
            padding-bottom: 1rem;
            .user-name {
              font-size: 2rem;
              font-weight: bold;
            }
            .ivu-tag {
              float: right;
              margin-right: 2rem;
            }
            .ivu-dropdown {
              float: right;
              // margin-top: .5rem;
              margin-right: 2rem;
              cursor: pointer;
              user-select: none;
              .ivu-icon {
                font-size: 2.5rem;
              }
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
              margin-bottom: 1rem;
              .content-body {
                min-height: 3rem;
              }
              .content-img {
                // margin-top: 1rem;
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
        .divider {
          height: 1.5px;
          background: #E8EAEC;
          margin: 0 2rem;
        }
        .card-bottom {
          // background: #eee;
          height: 50px;
          line-height: 50px;
          border-radius: 0 0 0.5rem 0.5rem;
          padding-left: 3rem;
          .text-icon {
            display: inline-block;
            height: 3rem;
            line-height: 3rem;
            padding-right: 3rem;
            padding-left: 3rem;
            border-right: 1px solid #ccc;
            user-select: none;
            cursor: pointer;
            &:first-child {
              padding-left: 1rem;
            }
            &:last-child {
              border-right: none;
            }
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
      .ivu-page {
        border-radius: 0 0 0.5rem 0.5rem;
        text-align: center;
        border: 1.5px solid #dedede;
        border-top: none;
        padding: 1.5rem;
        padding-top: .5rem;
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
    <img :src="emptyImg" v-if="!articleDetails.length" style="width: 100%;border: 1px solid #d9d9d9;">
    <ul class="single-article" v-else>
      <li
        v-show="item.type === filterType || filterType === 'all'"
        class="article-list-details"
        v-for="(item,index) in articleDetails"
        :key="item._id" :value="item.title">
        <div class="card">
          <div class="card-header-img">
            <img :src="item.author.avatar">
          </div>
          <div class="card-center">
            <div class="article-header">
              <router-link class="user-name" tag="a" :to="'/user/' + item.author._id">{{item.author.username}}</router-link>
              <Dropdown v-if="item.author._id === userDetails._id" trigger="click" @on-click="moreOperator($event, item._id)">
                <Icon type="ios-more" />
                <DropdownMenu slot="list">
                  <DropdownItem name="edit" v-show="item.type === 'long'" >
                    编辑
                  </DropdownItem>
                  <DropdownItem name="delete">
                    删除
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Tag color="error" v-if="item.isTop && item.author._id === userDetails._id">置顶</Tag>
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
                    <Tag v-for="(tag, index) in item.tag" :key="index" :color="randomColor()">{{tag}}</Tag>
                  </p>
                </div>
              </div>
              <!-- 短文 -->
        			<div v-else class="short-text">
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
          <!-- <Divider/> -->
          <div class="divider"></div>
          <div class="card-bottom">
            <!-- 点赞 -->
            <span
              v-if="!item.likeBy.includes(userDetails._id)" class="text-icon" @click="addToList('add', 'like', item._id, item.author._id)">
              <Icon type="ios-thumbs-up"/>点赞 × {{item.like_num}}
            </span>
            <span v-else class="text-icon like" @click="addToList('cancel', 'like', item._id, item.author._id)">
              <Icon type="ios-thumbs-up"/>点赞 × {{item.like_num}}
            </span>
            <!-- 评论 -->
            <span class="text-icon comment" @click="showComment(index)">
              <Icon type="md-chatboxes" />评论 {{item.comment_num}}
            </span>
            <!-- 收藏 -->
            <span v-if="!item.collectBy.includes(userDetails._id)" class="text-icon" @click="addToList('add', 'collect', item._id, item.author._id)">
              <Icon type="md-bookmark" />收藏 {{item.collect_num}}
            </span>
            <span v-else class="text-icon collect" @click="addToList('cancel', 'collect', item._id, item.author._id)">
              <Icon type="md-bookmark" />收藏 {{item.collect_num}}
            </span>
          </div>
          <!-- <div class="divider"></div> -->
        </div>
        <template>
          <comment-panel
            v-if="showCommentList[index]"
            :articleId="item._id"
            :author_id="item.author._id"
            :commentList="item.commentFrom.slice(currentPage - 1, currentPage + 2)"
            :avatar="userDetails.avatar || defaultAvatar">
          </comment-panel>
          <Page v-if="showCommentList[index]" :total="item.commentFrom.length" :current.sync="currentPage" :page-size="3" show-elevator/>
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
import { DEFAULT_AVATAR, EMPTY } from '@/constant/index.js';
import commentPanel from './comment-panel';
export default {
  components: { commentPanel },
  props: {
    articleDetails: {
      type: Array
    },
    userDetails: { // 登录用户信息 localStore不能实时改变
      type: Object
    },
    filterType: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      currentPage: 1,
      articleDetail: this.articleDetails,
      commentPanel: false,
      showPreviews: false,
      perviewSrc: '',
      allPerviewImg: [],
      previewIndex: -1,
      showCommentList: [],
      defaultAvatar: DEFAULT_AVATAR,
      emptyImg: EMPTY
    }
  },
  created() {
    this.showCommentList = [];
  },
  methods: {
    randomColor() {
      const colorList = ['primary', 'success', 'purple', 'error', 'warning'];
      let index = Math.floor((Math.random() * colorList.length));
      return colorList[index];
    },
    getDateType(time) {
      return Date.parse(new Date()) - Date.parse(time) > 86400 * 3 * 1000 ? 'date' : 'relative'
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
    // 编辑文章或删除文章
    moreOperator(name, articleId) {
      if (name === 'edit') {
        this.$router.push({ path: `/write/edit/${articleId}` });
      }
      else {
        this.$Modal.confirm({
          title: '操作提示',
          content: `<p>删除后不可恢复,是否确认删除该文章?</p>`,
          onOk: () => {
            this.axios.post('/articleDelete', {
              articleId: articleId
            })
            .then(res => {
              this.$Notice.success({ title: '提示',  desc: '删除成功' });
              this.$emit('updateOperator');
            })
            .catch(err => {
              this.$Notice.error({ title: '提示',  desc: err.message });
            })
          }
        });
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
