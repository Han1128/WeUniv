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
      width: 43.2rem;
      height: 50rem;
      border-radius: 1rem;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.35);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .input-area {
        width: 70%;
        margin: 0 auto;
        height: 15rem;
        margin-top: 15rem;
        .input-wrapper {
          position: relative;
          display: block;
          margin-top: 3rem;
          input {
            height: 4rem;
            width: 100%;
            color: #fff;
            padding-left: rem;
            background: inherit;
            border: 0;
            border-bottom: .1rem solid #fff;
            font-size: 1.4rem;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              color: #fff;
            }
          }
          .ivu-icon {
            position: absolute;
            font-size: 2.5rem;
            top: .8rem;
            right: .5rem;
            cursor: pointer;
          }
        }
        .signin-question {
          .ivu-checkbox-wrapper {
              line-height: 3rem;
              color: #fff;
              font-size: 1.3rem;
              float: left;
              margin: 0.8rem 0.5rem;
          }
          & > a:last-child {
            float: right;
          }
          a {
            color: #fff;
            margin: 0.8rem 0.5rem;
            line-height: 3rem;
            font-size: 1.3rem;
          }
        }
      }
      .panel-bottom {
        position: absolute;
        width: 100%;
        height: 4.5rem;
        bottom: 0;
        border-radius: 0 0 1rem 1rem;
        background: rgba(255,255,255, 0.9);
        .panel-bottom__label {
          font-size: 1.7rem;
          line-height: 4.5rem;
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
        font-size: 1.5rem;
        border-radius: .5rem;
      }
    }
    .register-content {
      width: 43.2rem;
      height: 50rem;
      border-radius: 1rem;
      // text-align: center;
      // background-color: rgba(0, 0, 0, 0.35);
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .ivu-steps {
        margin: 2rem;
        padding-left: 2rem;
      }
      .ivu-form {
        margin-top: 2rem;
        .ivu-form-item {
          /deep/.ivu-form-item-content {
              margin-right: 7rem;
              /deep/.error {
                .ivu-input {
                  border-color: red;
                }
              }
              /deep/.success {
                .ivu-input {
                  border-color: green;
                }
              }
              .ivu-date-picker {
                width: 100%;
              }
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
          margin-top: 1.5rem;
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
            <Checkbox v-model="registerForm.rememberme">记住我</Checkbox>
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
            <FormItem label="用户名" style="margin-bottom: 1rem">
              <i-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                :class="{'error': nameErrMsg !== '','success': nameErrMsg === '' && registerForm.username}"
                @on-blur="checkInput('username')">
              </i-input>
              <p v-show="nameErrMsg" style="color: red;line-height: 2rem;height: 2rem;">{{nameErrMsg}}</p>
            </FormItem>
            <FormItem label="性别">
                <RadioGroup v-model="registerForm.gender">
                    <Radio label="1">我是男生</Radio>
                    <Radio label="0">我是女生</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="用户类型">
              <Select v-model="registerForm.userType" placeholder="请选择用户类型">
                  <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="出生日期">
              <DatePicker
                v-model="registerForm.birth"
                type="date"
                :options="dateOption"
                placement="bottom-end"
                placeholder="输入或选择日期"
                >
              </DatePicker>
            </FormItem>
            <FormItem label="密码">
                <i-input type="password" v-model="registerForm.password" placeholder="输入账号密码"></i-input>
            </FormItem>
            <FormItem label="密码确认">
                <i-input type="password" v-model="registerForm.reconfirmPass" placeholder="确认密码输入"></i-input>
            </FormItem>
          </div>
          <div v-show="currentStep === 1">
            <FormItem label="邮箱" style="margin-bottom: 0">
                <i-input
                  v-model="registerForm.email"
                  placeholder="输入邮箱作为登录账号"
                  :class="{'error': emailErrMsg !== '','success': emailErrMsg === '' && registerForm.email}"
                  @on-blur="checkInput('email')">
                </i-input>
                <p v-show="emailErrMsg" style="color: red;line-height: 2rem;height: 2rem;">{{emailErrMsg}}</p>
            </FormItem>
            <FormItem label="" style="margin-bottom: 1rem;height: 2.5rem;">
              <a href="#" v-if="!isActiveClick" @click="activeEmail">{{timeOut === 0 ? '重新发送' : '点击激活邮箱'}}</a>
              <span v-else>{{timeOut}} s</span>
            </FormItem>
            <FormItem label="请输入激活码">
                <i-input type="text" v-model="registerForm.code" placeholder="输入邮箱激活码"></i-input>
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
      nameErrMsg: '',
      emailErrMsg: '',
      panelType: 'login',
      isActiveClick: false,
      timeOut: 60,
      userValidate: false,
      loginForm: {
        username: '',
        password: ''
      },
      cacheEmail: '', // 成功发送邮箱后保存发送邮箱
      registerForm: {
        username: '',
        birth: '',
        userType: '',
        gender: '1',
        email: '',
        password: '',
        reconfirmPass: '',
        code: '',
        rememberme: false
      },
      userTypeList: [{
        label: '学生',
        value: 'student'
      }, {
        label: '教师',
        value: 'teacher'
      }, {
         label: '机构',
        value: 'organization'
      }],
      value1: '',
      inputType: 'password',
      dateOption: {
        disabledDate (date) {
            return date && date.valueOf() > Date.now();
        },
        shortcuts: [
          {
            text: '1 week',
            value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
            }
          },
          {
            text: '1 month',
            value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
            }
          },
          {
            text: '3 months',
            value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
            }
          }
        ]
      }
    }
  },
  methods: {
    // 密码是否可见
    changeInputType () {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    },
    // 切换面板
    changePanelType() {
      this.panelType = this.panelType === 'login' ? 'register' : 'login';
      this.currentStep = 0;
      this.resetFromFields();
    },
    // 重设表单
    resetFromFields() {
      this.registerForm = {
        username: '',
        birth: '',
        userType: '',
        gender: '1',
        email: '',
        password: '',
        reconfirmPass: '',
        code: '',
        rememberme: false
      }
    },
    // 失焦 验证输入名 或 邮箱
    checkInput(type) {
      if (type === 'email') {
        this.emailErrMsg = ''
        const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!pattern.test(this.registerForm.email)) {
          return this.emailErrMsg = '邮箱格式不正确,请重新输入！';
        }
      }
      this.axios.get('/checkUserExist', {
        params: {
          checkType: type,
          checkData: type === 'username' ? this.registerForm.username : this.registerForm.email
        }
      })
      .then(res => {
        if (type === 'username') {
          this.nameErrMsg = '';
        }
        else {
          this.emailErrMsg = '';
        }
        // this.$Message.success(res.message);
      })
      .catch(err => {
        if (type === 'username') {
          this.nameErrMsg = err.message;
        }
        else {
          this.emailErrMsg = err.message;
        }
        // this.$Message.error(err.message);
      })
    },
    // 下一步
    nextStep() {
      if (this.currentStep === 0) {
        // 注册第一步 验证输入
        if (!this.registerForm.username || !this.registerForm.userType || !this.registerForm.birth
          || !this.registerForm.password|| !this.registerForm.reconfirmPass) {
          return this.$Message.error('表单不完整,请检查');
        }
        else if (this.registerForm.password !== this.registerForm.reconfirmPass) {
          return this.$Message.error('前后密码不一致,请检查');
        }
        this.currentStep = this.currentStep + 1;
      }
      else if (this.currentStep === 1) {
        // 第二步邮箱验证
        if (this.registerForm.email === '') {
          return this.$Message.error('请输入邮箱');
        }
        else if (this.registerForm.code === '') {
          return this.$Message.error('请输入验证码');
        }
        else if (this.registerForm.email !== this.cacheEmail) {
          return this.$Message.error('输入邮箱和发送验证邮箱不符,请修改');
        }
        else if (this.emailErrMsg !== '') {
          return;
        }
        this.emailCheckCode();
      }
      else if (this.currentStep === 2) {
        // 最后一步
        this.panelType = 'login';
        this.currentStep = 0;
        this.resetFromFields();
      }
    },
    // 发送邮件激活邮箱
    activeEmail() {
      this.isActiveClick = !this.isActiveClick;
      this.timeOut = 60;
      let timer = setInterval(() => {
        this.timeOut--;
        if (this.timeOut === 0) {
          clearInterval(timer);
          this.isActiveClick = false;
        }
      }, 1000);
      const data = {
        email: this.registerForm.email
      }
      this.axios.post('/sendEmail', data)
      .then(res => {
        this.$Message.success(res.message);
        this.cacheEmail = res.cacheEmail;
      })
      .catch(err => {
        this.$Message.error(err.message);
      })
    },
    // 验证码校验
    emailCheckCode () {
      const data = {
        username: this.registerForm.username,
        email: this.registerForm.email,
        userType: this.registerForm.userType,
        password: this.registerForm.password,
        gender: this.registerForm.gender,
        birth: this.registerForm.birth,
        code: this.registerForm.code
      }
      this.axios.post('/checkMail', data)
      .then(res => {
        this.$Message.success(res.message);
        this.currentStep = this.currentStep + 1;
      })
      .catch(err => {
        console.log('err', err)
        this.$Message.error(err.message);
      })
    },
    // 登录操作
    loginAction () {
      // 校验步骤
      this.axios.post('/login', {
        email: this.loginForm.username,
        password: this.loginForm.password
      })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userid', res.data.userid);
        this.$router.push({
          path: '/home'
        })
      })
      .catch(err => {
        this.$Message.error(err.message);
        this.$router.push({
          path: '/login'
        })
      })
    }
  }
}
</script>
