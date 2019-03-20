<style lang="less" scoped>
.admin-comment-manage {
  padding-top: 5rem;
  margin: 0 3rem;
  /deep/.ivu-table {
    width: 100%;
    /deep/td {
      text-align: center;
    }
  }
  /deep/.ivu-page {
    text-align: center;
    padding: 4rem 0;
    padding-top: 3rem;
  }
}
</style>
<template>
  <div class="admin-comment-manage">
    <i-table border :columns="commentMap" :data="commentsList">
      <template slot-scope="{ row, index }" slot="index">
          <strong>{{ (currentPage - 1)* 10 + index + 1 }}</strong>
      </template>
      <template slot-scope="{ row }" slot="from_author">
        <span>{{row.from_author.username}}</span>
      </template>
      <template slot-scope="{ row }" slot="from_article">
        <span>{{row.from_article ? row.from_article.title : '该评论为回复'}}</span>
      </template>
      <template slot-scope="{ row }" slot="isEffect">
        <Tag color="success" v-if="row.isEffect">有效</Tag>
        <Tag color="error" v-else>无效</Tag>
      </template>
      <template slot-scope="{ row }" slot="likeBy">
        <span>{{row.likeBy.length}}</span>
      </template>
      <template slot-scope="{ row }" slot="isReply">
        <span>{{row.isReply ? '是' : '否'}}</span>
      </template>
      <template slot-scope="{ row }" slot="commentTime">
        <Time :time="row.commentTime" type="datetime" />
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <i-button type="error" size="small" style="margin-right: 15px" @click="deleteComment(index)">删除</i-button>
      </template>
  </i-table>
  <Page :total="totalNums" :current.sync="currentPage" show-elevator @on-change="getAdminCommentsList"/>
  </div>
</template>
<script>
import { COMMENT_MAP } from '../common/index.js'
export default {
  components: {},
  data () {
    return {
      currentPage: 1,
      totalNums: 0,
      adminId: '',
      commentMap: COMMENT_MAP,
      commentsList: []
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getAdminCommentsList();
  },
  methods: {
    getAdminCommentsList() {
      this.axios.get('/getAdminCommentsList', {
        params: {
          adminId: this.adminId,
          pageNum: this.currentPage - 1
        }
      })
      .then(res => {
        this.commentsList = res.data.result;
        this.totalNums = res.data.count;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    deleteComment(index) {
      this.$Modal.confirm({
        title: '操作提示',
        content: `<p>是否确定要置该评论为无效？</p>`,
        onOk: () => {
          this.axios.post('/deleteComment', {
            adminId: this.adminId,
            commentId: this.commentsList[index]._id
          })
          .then(res => {
            this.$Notice.success({ title: '提示',  desc: '置为失效成功!' });
            this.getAdminCommentsList();
          })
          .catch(err => {
            this.$Notice.error({ title: '提示',  desc: err.message });
          })
        }
      })
    }
  }
}
</script>
