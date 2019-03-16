<style lang="less" scoped>
.admin-article-manage {

}
</style>
<template>
  <div class="admin-article-manage">
    <i-table size="large" border :columns="articleMap" :data="articleData">
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
        <Tag color="success" v-if="!row.status">有效</Tag>
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
            v-show="!recommendList.swiperList.includes(row._id)"
            type="error" size="small"
            @click="setSwiper(index)">
            设为轮播
          </i-button>
          <i-button
            v-show="!recommendList.recommendList.includes(row._id)"
            type="error"
            size="small"
            @click="setRecommend(index)">
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
    setSwiper () {

    },
    setRecommend () {

    }
  }
}
</script>
