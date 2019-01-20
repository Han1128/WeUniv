<style lang="less" scoped>
.weuniv-login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url(~assets/images/bg.jpg) #fff;
  background-size: cover;
  .weuniv-login__container {
    .login__panel {
      width: 432px;
      height: 500px;
      border-radius: 10px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.35);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .input-area {
        width: 70%;
        margin: 0 auto;
        height: 150px;
        margin-top: 150px;
        .input-wrapper {
          position: relative;
          display: block;
          margin-top: 30px;
          input {
            height: 40px;
            width: 100%;
            color: #fff;
            padding-left: 5px;
            background: inherit;
            border: 0;
            border-bottom: 1px solid #fff;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              color: #fff;
            }
          }
          .ivu-icon {
            position: absolute;
            font-size: 25px;
            top: 8px;
            right: 5px;
            cursor: pointer;
          }
        }
        .signin-question {
          & > a:first-child {
            float: left;
          }
          & > a:last-child {
            float: right;
          }
          a {
            color: #fff;
            margin: 5px 5px;
            line-height: 30px;
            font-size: 14px;
          }
        }
      }
      .panel-bottom {
        position: absolute;
        width: 100%;
        height: 45px;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        background: rgba(255,255,255, 0.9);
        .panel-bottom__label {
          font-size: 17px;
          line-height: 45px;
          p {
            display: inline;
          }
          a {
            display: inline;
          }
        }
      }
      .ivu-btn {
        width: 70%;
        font-size: 15px;
        border-radius: 5px;
      }
    }
    .register-content {
      width: 432px;
      height: 500px;
      border-radius: 10px;
      // text-align: center;
      // background-color: rgba(0, 0, 0, 0.35);
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .ivu-steps {
        margin: 20px;
        padding-left: 20px;
      }
      .ivu-form {
        margin-top: 30px;
        .ivu-form-item {
          /deep/.ivu-form-item-content {
              margin-right: 70px;
          }
        }
      }
      .ivu-btn {
        width: 70%;
        display: block;
        margin: 0 auto;
      }
      .panel-bottom {
        .panel-bottom__label {
          text-align: center;
          margin-top: 25px;
          p {
            display: inline;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="weuniv-login">
    <div class="weuniv-login__container">
      <!-- 登录面板 -->
      <div class="login__panel" v-show="panelType === 'login'">
        <div class="input-area">
          <div class="input-wrapper">
            <input type="text" v-model="loginForm.username" placeholder="输入账号或邮箱"/>
          </div>
          <div class="input-wrapper">
            <input :type="inputType" v-model="loginForm.password" placeholder="密码"/>
            <Icon v-show="inputType === 'password'" type="md-eye-off" @click="changeInputType"/>
            <Icon v-show="inputType === 'text'" type="md-eye" @click="changeInputType"/>
          </div>
          <div class="signin-question">
            <a href="#">邮箱未验证？</a>
            <a href="#">忘记密码？</a>
          </div>
        </div>
        <Button type="primary" @click="loginAction">登录</Button>
        <div class="panel-bottom">
          <div class="panel-bottom__label" v-show="panelType === 'login'">
            <p>没有账号？</p>
            <a href="#" @click="changePanelType">注册</a>
          </div>
        </div>
      </div>
      <!-- 注册面板 -->
      <div class="register-content" v-show="panelType === 'register'">
        <Steps :current="currentStep">
          <Step title="注册" icon="ios-person"></Step>
          <Step title="邮箱" icon="ios-mail"></Step>
          <Step title="完成" icon="md-checkmark-circle"></Step>
        </Steps>
        <Form :model="registerForm" label-position="right" :label-width="100">
          <div v-show="currentStep === 0">
            <FormItem label="Title">
                <i-input v-model="registerForm.input1"></i-input>
            </FormItem>
            <FormItem label="Title name">
                <i-input v-model="registerForm.input2"></i-input>
            </FormItem>
            <FormItem label="Aligned title">
                <i-input v-model="registerForm.input3"></i-input>
            </FormItem>
          </div>
          <div v-show="currentStep === 1">
            <FormItem label="邮箱">
                <i-input v-model="registerForm.input1" placeholder="输入邮箱作为登录账号"></i-input>
            </FormItem>
            <FormItem label="密码">
                <i-input type="password" v-model="registerForm.input2" placeholder="输入账号密码"></i-input>
            </FormItem>
            <FormItem label="密码确认">
                <i-input type="password" v-model="registerForm.input3" placeholder="确认密码输入"></i-input>
            </FormItem>
          </div>
        </Form>
        <Button type="primary" @click="nextStep">{{currentStep === 2 ? '完成注册' : '下一步'}}</Button>
        <div class="panel-bottom">
          <div class="panel-bottom__label" v-show="panelType === 'register'">
            <p>已有账号？</p>
            <a href="#" @click="changePanelType">登录</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 页面底部 -->
    <div class="login-bottom">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentStep: 0,
      panelType: 'login',
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        input1: '',
        input2: '',
        input3: '',
      },
      inputType: 'password'
    }
  },
  methods: {
    changeInputType () {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    },
    changePanelType() {
      this.panelType = this.panelType === 'login' ? 'register' : 'login';
    },
    nextStep() {
      if (this.currentStep === 2) {
        this.panelType = 'login';
        this.currentStep = 0;
      }
      else {
        this.currentStep = this.currentStep + 1;
      }
    },
    loginAction () {
      // 校验步骤
      this.axios.post('/login', {
        email: this.loginForm.username,
        password: this.loginForm.password
      })
      .then(res => {
        if (res.data.status) {
          localStorage.setItem('token', res.data.data.token);
          this.$router.push({
            path: '/home'
          })
        }
        else {
          this.$Message.error(res.data.message);
        }
      })
      .catch(err => {
        this.$router.push({
          path: '/login'
        })
      })
    }
  }
}
</script>
