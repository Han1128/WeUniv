<style lang="less" scoped>

</style>
<template>
  <div class="weuniv-error">
    <p>{{errMessage}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      errMessage: '错误页面'
    }
  },
  created() {
    this.$nextTick(_ => {
      this.errMessage = this.$route.query.errMsg;
      console.log('meaasge', this.errMessage);
    })
  },
  methods: {

  }
}
</script>
