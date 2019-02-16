<style lang="less" scoped>
.article-write {
  .writing-header {
    width: 100%;
    height: 50px;
    background: #2D8CF0;
    .text-button {
        font-size: 1.5rem;
        height: 100%;
    }
  }
}
</style>
<template>
  <div class="article-write">
    <div class="writing-header">
      <Button class="text-button" type="text" ghost @click="showDrawer=true">编辑器设置</Button>
      <Button class="text-button" type="text" ghost @click="goBack">返回首页</Button>
    </div>
    <Drawer title="编辑器设置" placement="left" :closable="false" v-model="showDrawer">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
    <div class="edit-content">
      <quill-editor ref="quillEdit"></quill-editor>
      <Button type="primary" @click="submitForm">提交</Button>
    </div>
  </div>
</template>
<script>
import quillEditor from './components/quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      showDrawer: false,
      isSave: false,
    }
  },
  computed: {
  },
  mounted() {

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
  },
  methods: {
    submitForm() {
      //TODO:判断编辑器类型使用ref来调用编辑器的表单提交
      this.isSave = true;
      this.$refs.quillEdit.articleConfirm();
    },
    goBack() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
