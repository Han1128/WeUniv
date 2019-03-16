<style lang="less" scoped>
.admin-article-manage {

}
</style>
<template>
  <div class="admin-article-manage">
    <i-table border :columns="articleMap" :data="articleData">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <i-button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</i-button>
            <i-button type="error" size="small" @click="remove(index)">设为轮播</i-button>
            <i-button type="error" size="small" @click="remove(index)">设为推荐</i-button>
        </template>
    </i-table>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      adminId: '',
      articleMap: [],
      articleData: []
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getData();
  },
  computed: {

  },
  methods: {
    getData() {
      this.axios.get('/getAdminMenuList', {
        params: {
          adminId: this.adminId,
          type: ''
        }
      })
      .then(res => {
        debugger
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
