<style lang="less" scoped>
.tag-search-page {
    width: 65%;
    margin: 0 auto;
    margin-top: 5rem;
    position: relative;
    overflow: hidden;
    .content-right {
      width: 32rem;
      float: right;
      margin-top: 1rem;
      .tag-search {
        width: auto;
        padding-bottom: 2rem;
        padding-left: 1rem;
        margin: 2rem;
        border-radius: .5rem;
        background: #fff;
        .tag-search_header {
          padding: 1rem 2rem;
          padding-top: 2rem;
          padding-bottom: 0;
          overflow: hidden;
          .label {
            padding-top: 1.5rem;
            font-size: 1.8rem;
            font-weight: bolder;
            margin-left: 8rem;
            font-family: sans-serif;
            cursor: pointer;
          }
          svg {
            float: left;
          }
        }
        .tag-search_follow {
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
      .follower-list {
        width: auto;
        margin: 2rem;
        padding: 1rem 0;
        overflow: hidden;
        background: #fff;
        .follower-list-header {
          h2 {
            font-size: 1.6rem;
            padding-bottom: 1rem;
            padding-left: 2rem;
            border-bottom: 1px solid #e6e6e6;
          }
        }
        .follower-list-item {
          float: left;
          width: 8rem;
          height: 8rem;
          overflow: hidden;
          text-align: center;
          padding-top: 1rem;
          img {
            width: 4rem;
            border-radius: 4rem;
          }
        }
      }
    }
    .content-center {
      width: auto;
      margin-right: 34rem;
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
            border-radius: .5rem;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
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
  <div class="tag-search-page">
    <div class="content-right">
      <div class="tag-search">
        <div class="tag-search_header">
          <svg class="icon-large icon-style" aria-hidden="true">
                <use :xlink:href="'#'+tagInfo.iconCode"></use>
            </svg>
          <p class="label">{{tagInfo.iconLabel}}</p>
        </div>
        <p class="tag-search_follow">
          <ul class="follow-list">
            <li>
              {{articleDetails.length}}<p>相关文章</p>
            </li>
            <li>
              {{tagInfo.follower_num}}<p>关注人数</p>
            </li>
          </ul>
        </p>
      </div>
      <div class="follower-list">
        <div class="follower-list-header">
          <h2>关注者</h2>
        </div>
        <ul>
          <li class="follower-list-item" v-for="(item, index) in tagInfo.follower" :key="index">
            <img class="user-avatar" v-lazy="item.avatar || defaultAvatar">
            <p>{{item.username}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 话题关注用户 -->
    <div class="content-center">
      <short-text-editor :tagProp="selectTag"  @uploadUserData="getTagInfo"></short-text-editor>
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
          :page="'tag'"
          :filterType="filterType"
          :articleDetails="articleDetails"
          :userDetails="userDetails"
          @updateOperator="getTagInfo">
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
      tagId: '',
      tagName: '',
      tagInfo: {},
      selectTag: [],
      articleDetails: [],
      userDetails: {},
      filterType: 'all',
      defaultAvatar: DEFAULT_AVATAR
    }
  },
  created() {
    if (this.$route.params.tagId) {
      this.tagId = this.$route.params.tagId;
      this.tagName = this.$route.params.tagName;
      this.selectTag.push(this.tagName);
      this.getTagInfo();
    }
    else {
      this.$router.push({ path: '/home/tag' });
    }
    // 交互操作更新
    bus.$on('updateHomeData', () => {
      this.getTagInfo();
    })
  },
  destroyed() {
    bus.$off('updateHomeData');
  },
  methods: {
    // 通过tag筛选内容
    getTagInfo() {
      this.axios.get('/getTagInfo', {
        params: {
          tagId: this.tagId
        }
      })
      .then(res => {
        this.tagInfo = res.data.tagInfo;
        this.articleDetails = res.data.articleDetails;
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: localStorage.getItem('userid')
        }
      })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        this.userDetails = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
