<style lang="less" scoped>
.admin-article-manage {

}
</style>
<template>
  <div class="admin-article-manage">
    <i-table size="large" border :columns="userMap" :data="userData">
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <Tag color="success" v-if="row.status">有效</Tag>
        <Tag color="error" v-else>无效</Tag>
      </template>
      <!-- 标签 -->
      <template slot-scope="{ row }" slot="tag">
        <Tag
          color="primary"
          v-for="(item, index) in row.hobby_tags"
          :key="index">
          {{ item }}
        </Tag>
      </template>
      <template slot-scope="{ row }" slot="article">
        <strong>{{row.article.length}}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <i-button type="primary" size="small" @click="showDetails(index)">详情</i-button>
          <i-button
            v-show="!recommendList.recommendList.includes(row._id)"
            type="error"
            size="small"
            @click="setRecommend(index)">
            设为推荐
          </i-button>
      </template>
    </i-table>
    <Page :total="totalNums" :current.sync="currentPage" show-elevator @on-change="getUserData"/>
  </div>
</template>
<script>
import { USER_MAP } from '../common/index.js'
export default {
  data () {
    return {
      adminId: '',
      userMap: USER_MAP,
      userData: [],
      recommendList: {},
      currentPage: 1,
      totalNums: 0,
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getUserData();
  },
  methods: {
    getUserData() {
      this.axios.get('/getAdminMenuList', {
        params: {
          adminId: this.adminId,
          type: 'user',
          pageNum: this.currentPage - 1
        }
      })
      .then(res => {
        this.recommendList = res.data.recommendList;
        this.userData = res.data.result;
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
