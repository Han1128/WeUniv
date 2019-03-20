<style lang="less" scoped>
.admin-tag-manage {
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
  <div class="admin-tag-manage">
    <i-table border :columns="tagMap" :data="tagsList">
      <template slot-scope="{ row, index }" slot="index">
          <strong>{{ (currentPage - 1)* 10 + index + 1 }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <i-button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</i-button>
          <i-button type="error" size="small" style="margin-right: 5px" @click="show(index)">删除</i-button>
      </template>
    </i-table>
    <Page :total="totalNums" :current.sync="currentPage" show-elevator @on-change="getAdminTagsList"/>
  </div>
</template>
<script>
import { TAG_MAP } from '../common/index.js'
export default {
  components: {},
  data () {
    return {
      currentPage: 1,
      totalNums: 0,
      adminId: '',
      tagMap: TAG_MAP,
      tagsList: []
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getAdminTagsList();
  },
  methods: {
    getAdminTagsList() {
      this.axios.get('/getAdminTagsList', {
        params: {
          adminId: this.adminId,
          pageNum: this.currentPage - 1
        }
      })
      .then(res => {
        this.tagsList = res.data.result;
        this.totalNums = res.data.count;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
