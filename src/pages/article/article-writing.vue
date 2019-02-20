<style lang="less" scoped>
.article-write {
  .writing-header {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    border-top: 0.3rem solid #009a61;
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.3), 0 0 0.6rem 0.3rem rgba(0, 0, 0, 0.15);
    background: #fafafa;
    /deep/.ivu-btn {
      font-size: 1.4rem;
      color: #fff;
      background: #009a61;
    }
    .btn-right {
      float: right;
    }
  }
}
</style>
<template>
  <div class="article-write">
    <div class="writing-header">
      <Button @click="goBack">返回首页</Button>
      <span class="btn-right">
        <Button @click="submitForm">发布文章</Button>
        <Button icon="md-settings" @click="showDrawer=true">编辑设置</Button>
      </span>
    </div>
    <Drawer title="编辑器设置" placement="left" :closable="false" v-model="showDrawer">
        <ul>
          <li>Quill</li>
          <li>Tinymc</li>
        </ul>
    </Drawer>
    <div class="edit-content">
      <!-- <quill-editor ref="quillEditor" @turnPage="turnPage"></quill-editor> -->
      <!-- <tiny-editor ref="tinyEditor" ></tiny-editor> -->
      <wang-editor ref="wangEditor" @turnPage="turnPage"></wang-editor>
    </div>
  </div>
</template>
<script>
import quillEditor from './components/quill-editor'
import tinyEditor from './components/tiny-editor'
import wangEditor from './components/wang-editor'
import bus from './common/bus.js'
export default {
  components: { quillEditor, tinyEditor, wangEditor },
  data () {
    return {
      currentEditor: 'wangEditor', // 当前编辑器
      showDrawer: false,
      isSave: false,
    }
  },
  computed: {
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
    else {
      next();
    }
  },
  methods: {
    turnPage(articleid) {
      this.isSave = true;
      this.$router.push({ path: `/view/${articleid}`});
    },
    submitForm() {
      // this.$refs.quillEdit.articleConfirm();
      this.$refs[this.currentEditor].articleConfirm();
    },
    goBack() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
