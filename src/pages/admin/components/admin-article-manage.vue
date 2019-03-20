<style lang="less" scoped>
.admin-article-manage {
  padding-top: 5rem;
  .ivu-table-wrapper {
    width: 95%;
    margin: 0 auto;
    // margin-top: 5rem;
    /deep/.ivu-table {
      width: 100%;
      /deep/td {
        text-align: center;
      }
    }
  }
  .ivu-page {
    text-align: center;
    margin: 2rem 0;
    margin-top: 3rem;
  }
}
</style>
<template>
  <div class="admin-article-manage">
    <i-table size="large" border :columns="articleMap" :data="articleData">
      <template slot-scope="{ row, index }" slot="index">
          <strong>{{ (currentPage - 1)* 10 + index + 1 }}</strong>
      </template>
      <!-- 作者 -->
      <template slot-scope="{ row }" slot="title">
          <strong>{{ row.title || '说说无标题' }}</strong>
      </template>
      <!-- 作者 -->
      <template slot-scope="{ row }" slot="author">
          <strong>{{ row.author.username }}</strong>
      </template>
      <!-- 文章类型 -->
      <template slot-scope="{ row }" slot="type">
          <strong>{{ row.type === 'long' ? '文章' : '说说' }}</strong>
      </template>
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <Tag color="success" v-if="row.status">有效</Tag>
        <Tag color="error" v-else>无效</Tag>
      </template>
      <!-- 置顶 -->
      <template slot-scope="{ row }" slot="isTop">
          <strong>{{ row.isTop ? '是' : '否' }}</strong>
      </template>
      <!-- 标签 -->
      <template slot-scope="{ row }" slot="tag">
        <Tag
          color="primary"
          v-for="(item, index) in row.tag"
          :key="index">
          {{ item }}
        </Tag>
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <i-button type="primary" size="small" @click="showDetails(index)">详情</i-button>
          <i-button
            v-show="!recommendList.swiperList.includes(row._id) && row.type === 'long' && row.coverBg[0]"
            type="error" size="small"
            @click="setToRecommend(index, 'swiper')">
            设为轮播
          </i-button>
          <i-button
            v-show="!recommendList.recommendList.includes(row._id) && row.type === 'long'"
            type="error"
            size="small"
            @click="setToRecommend(index, 'recommend')">
            设为推荐
          </i-button>
      </template>
    </i-table>
    <Page :total="totalNums" :current.sync="currentPage" show-elevator @on-change="getArticleData"/>
  </div>
</template>
<script>
import { ARTICLE_MAP } from '../common/index.js'
export default {
  data () {
    return {
      adminId: '',
      articleMap: ARTICLE_MAP,
      articleData: [],
      recommendList: {},
      currentPage: 1,
      totalNums: 0,
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getArticleData();
  },
  methods: {
    getArticleData() {
      this.axios.get('/getAdminMenuList', {
        params: {
          adminId: this.adminId,
          type: 'article',
          pageNum: this.currentPage - 1
        }
      })
      .then(res => {
        this.recommendList = res.data.recommendList;
        this.articleData = res.data.result;
        this.totalNums = res.data.count;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    showDetails() {

    },
    setToRecommend(index, type) {
      let msg = type === 'swiper'
        ? '新增轮播图将替代旧轮播图,是否确认修改？'
        : '新增推荐文章将替代旧推荐文章,是否确认修改？';
      let api = type === 'swiper' ? '/addToHomeSwiper' : '/addToHomeRecommend'
      this.$Modal.confirm({
        title: '操作提示',
        content: `<p>${msg}</p>`,
        onOk: () => {
          this.axios.post(api, {
            adminId: this.adminId,
            articleId: this.articleData[index]._id
          })
          .then(res => {
            this.$Notice.success({ title: '提示',  desc: '设置成功!' });
            this.getArticleData();
          })
          .catch(err => {
            this.$Notice.error({ title: '提示',  desc: err.message });
          })
        }
      });
    }
  }
}
</script>
