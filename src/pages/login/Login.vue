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
  .login-content {
    .signin-container {
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
        width: 100%;
        height: 150px;
        margin-top: 150px;
        .input-wrapper {
          position: relative;
          display: block;
          margin-top: 30px;
          input {
            height: 40px;
            width: 70%;
            color: #fff;
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
            right: 65px;
            cursor: pointer;
          }
        }
      }
      .ivu-btn {
        width: 70%;
        font-size: 15px;
        border-radius: 5px;
      }
    }
  }
}
</style>
<template>
  <div class="weuniv-login">
    <div class="login-content">
      <div class="signin-container">
        <div class="input-area">
          <div class="input-wrapper">
            <input type="text" v-model="form.username" placeholder="输入账号或邮箱"/>
          </div>
          <div class="input-wrapper">
            <input :type="inputType" v-model="form.password" placeholder="密码"/>
            <Icon v-show="inputType === 'password'" type="md-eye-off" @click="changeInputType"/>
            <Icon v-show="inputType === 'text'" type="md-eye" @click="changeInputType"/>
          </div>
        </div>
        <Button type="primary" @click="loginAction">登录</Button>
      </div>
    </div>
    <div class="login-bottom">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      inputType: 'password'
    }
  },
  methods: {
    changeInputType () {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    },
    loginAction () {
      // 校验步骤
      this.axios.post('/api/login', {
        email: this.form.username
      })
      .then(res => {
        if (res.data.status) {
          localStorage.setItem('token', res.data.token);
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
