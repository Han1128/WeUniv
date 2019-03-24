<style lang="less" scoped>
.user-details {

}
</style>
<template>
  <div class="user-details">
    <Form :model="tagData" :label-width="100">
        <FormItem label="id">
            <i-input v-model="tagDetails.iconLabel" placeholder="输入话题名"></i-input>
        </FormItem>
        <FormItem label="用户名">
            <i-input v-model="tagDetails.iconCode" placeholder="输入话题iconfont编码"></i-input>
        </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
    tagDetails: {
      type: Object,
      default: _ => {}
    }
  },
  data () {
    return {
      tagData: {
        iconFont: '',
        iconCode: ''
      }
    }
  },
  watch: {
    confirm() {
      this.tagData = JSON.parse(JSON.stringify(this.tagDetails));
    }
  },
  methods: {
    modifyTag() {
      this.axios.post('/addTopicTags', {
        iconFont: this.tagDetails.iconFont,
        iconCode: this.tagDetails.iconCode
      })
      .then(res => {
        this.$Notice.success({ title: '提示',  desc: res.message });
        this.$emit('success')
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
