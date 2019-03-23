<style lang="less" scoped>
.short-text-modal {
  .modal-center {
    /deep/.short-text-editor {
      margin-top: 0;
      padding: 0;
      .box-header {
        display: none;
      }
      .box-footer {
        display: none;
      }
    }
  }
}
</style>
<template>
  <div>
    <Modal class="short-text-modal" v-model="modalShow" width="360" @on-cancel="resetFields">
        <p slot="header" style="color:#009a61;text-align:center">
            <span>发说说</span>
        </p>
        <div class="modal-center">
          <short-text-editor ref="shortEditor" @uploadUserData="getUserInfo"></short-text-editor>
        </div>
        <div slot="footer">
          <Button class="submit-btn" @click="shortTextConfirm" size="large" long >发布</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import shortTextEditor from '@/pages/article/components/short-text-editor.vue';
export default {
  name: 'g-short-text',
  components: { shortTextEditor },
  data () {
    return {
      modalShow: false // 模态框显示状态
    }
  },
  created() {
    bus.$on('writeShortText', () => {
      this.modalShow = this.modalShow ? false : true;
    })
  },
  // destroyed() {
  //   bus.$off('writeShortText');
  // },
  methods: {
    resetFields() {
      this.$refs.shortEditor.resetFields();
    },
    shortTextConfirm() {
      this.$refs.shortEditor.shortTextConfirm();
    },
    // 获取用户信息
    getUserInfo() {
      this.modalShow = false;
      this.axios.get('/getUserDetails', {
        params: {
          id: localStorage.getItem('userid')
        }
      })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
</script>
