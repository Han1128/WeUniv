<style lang="less" scoped>
.article-details {
  .single-article {
    li {
      display: block;
      list-style: none;
      width: 100%;
      height: 15rem;
      background: #FCF8E3;
      &:hover {
        background: #d9d9d9;
      }
      .long-text {
        height: 100%;
        .article-image {
          display:block;
          height: 100%;
          width: 18rem;
          float: right;
          // background:#009A61;
          position: relative;
          img {
            width: 16rem;
            height: 12rem;
            border-radius: .5rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .main {
          position: relative;
          margin-right: 18rem;
          height: 100%;
          padding-left: 0.8rem;
          .title {
            padding: 1.5rem 2rem;
            a {
              font-size: 1.8rem;
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
      .short-text_main {
        height: 100%;
        .short-text_author {
          width: 80rem;
          height: 100%;
          background: orange;
        }
        .short-text_content {

        }
        .short-text_bg {
          li {
            float: left;
            img {
              width: 8rem;
              height: 8rem;
            }
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
      <li v-for="item in articleDetails" :key="item._id" :value="item.title">
        <div class="long-text" v-if="item.type === 'long'">
          <div class="article-image">
            <img :src="item.coverBg[0]">
          </div>
          <div class="main">
            <div class="title">
              <router-link tag="a" :to="'/view/' + item._id">{{item.title}}</router-link>
            </div>
            <div class="meta">
              <router-link tag="a" :to="'/user/' + item.author._id">{{item.author.username}}</router-link>
              <p><Time :time="Date.parse(item.public_time)" :type="getDateType(item.public_time)"/></p>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="short-text_main">
            <div class="short-text_author"></div>
            <div class="short-text_content">{{item.content}}</div>
            <!-- <ul class="short-text_bg">
              <li v-for="imgUrl in item.coverBg" :key="imgUrl">
                <img :src="imgUrl">
              </li>
            </ul> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    articleDetails: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getDateType(time) {
      return Date.parse(new Date()) - Date.parse(time) > 86400 * 3 * 1000 ? 'date' : 'relative'
    }
  }
}
</script>
