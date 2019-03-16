<style lang="less" scoped>
.a {

}
</style>
<template>
  <div class="a">

  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {

    }
  },
  created() {
    this.getData();
  },
  computed: {

  },
  methods: {
    getData() {
      this.axios.get('/', {
        params: {
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
