<style lang="less" scoped>
.user-register {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="user-register">
    <!-- 注册面板 -->
    <Steps :current="0">
      <Step title="注册" icon="ios-person"></Step>
      <Step title="上传头像" icon="ios-camera"></Step>
      <Step title="验证邮箱" icon="ios-mail"></Step>
    </Steps>
    <i-form :model="registerForm" label-position="right" :label-width="100">
        <form-item label="Title">
            <i-input v-model="registerForm.input1"></i-input>
        </form-item>
        <form-item label="Title name">
            <i-input v-model="registerForm.input2"></i-input>
        </form-item>
        <form-item label="Aligned title">
            <i-input v-model="registerForm.input3"></i-input>
        </form-item>
    </i-form>
    <Button type="primary" >下一步</Button>
    <div class="panel-bottom">
      <div class="panel-bottom__label">
        <p>已有账号？</p>
        <a href="#" @click="changePanelType">登录</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      registerForm: {
        value1: '',
        value2: '',
        value3: ''
      }
    }
  },
  methods: {

  }
}
</script>
