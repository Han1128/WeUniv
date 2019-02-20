<style lang="less" scoped>
.article-view {
  .article-view-area {
    width: 70%;
    margin: 0 auto;
    margin-top: 6rem;
    padding: 0 1rem;
    box-sizing: border-box;
    /deep/div {
      p, h1, h2, h3, h4, h5, table, pre {
        margin: 15px 0;
        line-height: 1.5;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      ol {
        margin: 10px 0 10px 20px;
        li {
          margin: .3rem 0;
        }
      }
      blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
      }
      code {
        width: 100%;
        display: inline-block;
        background-color: #f1f1f1;
        border-radius: 3px;
        padding: 10px;
        margin: 0 3px;
        border-radius: 5px;
        line-height: 1.5;
        color: #333;
      }
    }
  }
}
</style>
<template>
  <div class="article-view">
    <g-header></g-header>
    <div class="article-view-area" >
      <div v-html="articleContent"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userData: {},
      articleUrl: '',
      articleContent: ''
    }
  },
  created() {
    //用户信息和文章信息通过props分开传
    this.articleId = this.$route.params.articleid;
    this.getDesignArticle();
  },
  methods: {
    getDesignArticle() {
      this.axios.get('/getDesignArticle', {
        params: {
          articleId: this.articleId
        }
      })
      .then(res => {
        this.articleContent = res.data.articleContent;
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
