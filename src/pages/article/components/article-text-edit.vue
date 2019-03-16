<style lang="less" scoped>
.article-text-edit {
  .writing-header {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    border-top: 0.3rem solid #009a61;
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.3), 0 0 0.6rem 0.3rem rgba(0, 0, 0, 0.15);
    background: #fafafa;
    /deep/.ivu-btn {
      font-size: 1.4rem;
      color: #fff;
      background: #009a61;
    }
    .btn-right {
      float: right;
    }
  }
}
</style>
<template>
  <div class="article-text-edit">
    <div class="writing-header">
      <Button @click="goBack">返回首页</Button>
      <span class="btn-right">
        <Button @click="submitForm">发布文章</Button>
      </span>
    </div>
    <wang-editor ref="wangEditor" :articleDetailContent="articleDetailContent" @turnPage="turnPage"></wang-editor>
  </div>
</template>
<script>
const R = require('ramda');
import wangEditor from './wang-editor';
import mixins from '../common/mixins.js'
export default {
  mixins: [mixins],
  components: { wangEditor },
  data () {
    return {
      articleId: '',
      articleDetailContent: {}
    }
  },
  created() {
    this.articleId = this.$route.params.articleId;
    this.getArticleContent();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSave) {
      const request = window.confirm('Do you really want to leave? you have unsaved changes!');
      if (request) {
        next();
      }
      else {
        next(false);
      }
    }
    else {
      next();
    }
  },
  methods: {
    getArticleContent() {
      this.axios.get('/getDesignArticle', {
        params: {
          articleId: this.articleId,
          addView: true
        }
      })
      .then(res => {
        this.articleDetailContent = R.pick(['_id', 'title', 'content', 'coverBg', 'tag', 'isTop'])(res.data.result);
      })
      .catch(err => {
        console.log('err', err)
        this.$Message.error('文章获取失败');
      })
    },
    turnPage(articleid) {
      this.isSave = true;
      this.getUserInfo(); //更新localStore
      this.$router.push({ path: `/view/${articleid}`});
    },
    goBack() {
      this.$router.push({
        path: '/home'
      })
    },
    submitForm() {
      this.$refs.wangEditor.articleEdit();
    },
  }
}
</script>
