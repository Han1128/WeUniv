<style lang="less" scoped>
.detail-info {
  .datail-title {
    height: 6rem;
    font-size: 2rem;
    padding-top: 2rem;
    margin: 0 3rem;
  }
  .ivu-divider {
    width: auto;
    margin: 20px;
    background: #d9d9d9;
  }
  .set-item {
    margin-left: 5rem;
    .set-item-detail {
      margin-bottom: 2rem;
      /deep/.ivu-input-wrapper {
        width: 40rem;
      }
      .item-label {
        width: 15rem;
        display: inline-block;
        font-size: 1.5rem;
        font-weight: bold;
        padding-right: 4rem;
        vertical-align: text-top;
      }
      .btn-style {
        margin-left: 2rem;
        background: #009A61;
        color: #fff;
      }
    }
  }
}
</style>
<template>
  <div class="detail-info">
    <!-- 邮箱修改 -->
    <h2 class="datail-title">邮箱修改</h2>
      <Divider />
      <div class="set-item">
        <div class="set-item-detail">
          <span class="item-label">邮箱</span>
          <i-input v-model="resetEmail.email" placeholder="输入修改新邮箱"></i-input>
          <span>
            <a href="#" v-if="!resetEmail.isActiveClick" style="margin-left: 2rem;font-size: 1.3rem;" @click="activeEmail('resetEmail')">{{resetEmail.timeOut === 0 ? '重新发送' : '发送验证邮件'}}</a>
            <span v-else>{{resetEmail.timeOut}} s</span>
          </span>
        </div>
        <div class="set-item-detail">
          <span class="item-label">输入验证码</span>
          <i-input v-model="resetEmail.code" placeholder="输入验证码"></i-input>
          <Button class="btn-style" @click="submitEmailReset()">提交更改</Button>
        </div>
      </div>

      <!-- 密码修改 -->
      <h2 class="datail-title">密码修改</h2>
      <Divider />
      <div>
        <div class="set-item">
          <div class="set-item-detail">
            <span class="item-label">原密码</span>
            <i-input
              type="password"
              v-model="modifyPwd.oldPwd"
              @on-blur="verificatePwd"
              placeholder="输入账号密码">
            </i-input>
          </div>
        </div>
        <div class="set-item">
          <div class="set-item-detail">
            <span class="item-label">新密码</span>
            <i-input type="password" v-model="modifyPwd.newPwd" placeholder="确认密码输入"></i-input>
            <i-button class="btn-style" @click="submitPwdModify">提交修改</i-button>
          </div>
        </div>
      </div>

      <!-- 密码重置 -->
      <h2 class="datail-title">密码重置</h2>
      <Divider />
      <div class="set-item">
        <div class="set-item-detail">
          <span class="item-label">邮箱</span>
          <i-input v-model="resetPwd.email" placeholder="请输入验证邮箱"></i-input>
          <span>
            <a href="#" v-if="!resetPwd.isActiveClick" style="margin-left: 2rem;font-size: 1.3rem;" @click="activeEmail('resetPwd')">{{resetPwd.timeOut === 0 ? '重新发送' : '发送验证邮件'}}</a>
            <span v-else>{{resetPwd.timeOut}} s</span>
          </span>
        </div>
      </div>
      <div class="set-item">
        <div class="set-item-detail">
          <span class="item-label">验证码</span>
          <i-input v-model="resetPwd.code" placeholder="请输入邮箱验证码"></i-input>
        </div>
      </div>
      <div class="set-item">
        <div class="set-item-detail">
          <span class="item-label">新密码</span>
          <i-input type="password" v-model="resetPwd.newPwd" placeholder="请输入新密码"></i-input>
          <i-button class="btn-style" @click="resetUserPwd">提交修改</i-button>
        </div>
      </div>
  </div>
</template>
<script>

import { UN_MODIFY_INFO, USER_COMMON_LIST, USER_SCHOOL_INFO } from '../common/index.js'
export default {
  props: {
    userBaseInfo: {
      type: Object,
      default: _ => {}
    }
  },
  data () {
    return {
      userId: '',
      userSchoolInfo: USER_SCHOOL_INFO,
      copyData: this.userBaseInfo,
      resetEmail: {
        email: '',
        code: '',
        cacheEmail: '', // 邮箱验证的邮箱
        isActiveClick: false,
        timeOut: 60,
      },
      modifyPwd: {
        oldPwd: '',
        newPwd: '',
        isEffect: '' // 输入旧密码是否正确
      },
      resetPwd: {
        email: '',
        code: '',
        newPwd: '',
        isActiveClick: false,
        timeOut: 60,
      },
    }
  },
  watch: {
    copyData() {
      return this.userBaseInfo;
    },
    'modifyPwd.oldPwd' (val) {
      if (val === '') {
        this.modifyPwd.isEffect = '';
      }
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
  },
  methods: {
    // 发送邮件激活邮箱
    activeEmail(type) {
      this[type].isActiveClick = !this[type].isActiveClick;
      this[type].timeOut = 60;
      let timer = setInterval(() => {
        this[type].timeOut--;
        if (this[type].timeOut === 0) {
          clearInterval(timer);
          this[type].isActiveClick = false;
        }
      }, 1000);

      if (!this[type].email) return;
      const data = {
        email: this[type].email,
        type
      }
      this.axios.post('/verificateByEmail', data)
      .then(res => {
        this.$Message.success(res.message);
        this.resetEmail.cacheEmail = res.cacheEmail;
      })
      .catch(err => {
        this.$Message.error(err.message);
      })
    },
    // 修改邮箱
    submitEmailReset() {
      this.axios.post('/resetUserEmail', {
        email: this.resetEmail.email,
        userId: this.userId,
        code: this.resetEmail.code,
        type: 'resetEmail'
      })
      .then(res => {
        this.$Message.success(res.message);
        this.resetEmail = {
          email: '',
          code: '',
          cacheEmail: '', // 邮箱验证的邮箱
          isActiveClick: false,
          timeOut: 60,
        }
      })
      .catch(err => {
        this.$Message.error(err.message);
      })
    },
    // 密码验证
    verificatePwd() {
			this.axios.get('/verificatePwd', {
        params: {
          userId: this.userId,
          pwd: this.modifyPwd.oldPwd
        }
      })
      .then(res => {
        this.$Message.success(res.message);
        this.modifyPwd.isEffect = true;
      })
      .catch(err => {
        this.$Message.error(err.message);
        this.modifyPwd.isEffect = false;
      })
		},
    // 修改密码
    submitPwdModify() {
      if (!this.modifyPwd.isEffect) return this.$Message.error('请先验证密码!');
      this.axios.post('/updateUserPwd', {
          userId: this.userId,
          password: this.modifyPwd.newPwd
      })
      .then(res => {
        this.$Message.success('修改成功,请重新登录');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        localStorage.removeItem('userData');
        this.$router.push({ path: '/login' });
      })
      .catch(err => {
        this.$Message.error(err.message);
      })
    },
    // 密码重置
    resetUserPwd() {
      this.axios.post('/resetUserPwd', {
        userId: this.userId,
        code: this.resetPwd.code,
        password: this.resetPwd.password,
        type: 'resetPwd'
      })
      .then(res => {
        this.$Message.success(res.message);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        localStorage.removeItem('userData');
        this.$router.push({ path: '/login' });
      })
      .catch(err => {
        this.$Message.error(err.message);
      })
    }
  }
}
</script>
