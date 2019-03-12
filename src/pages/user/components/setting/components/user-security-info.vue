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
  .ivu-form {
    width: 75%;
    margin: 0 auto;
    /deep/.ivu-form-item-label {
      width: 100px;
      font-size: 1.4rem;
      font-weight: bolder;
    }
  }
  .common-setting {
    li {
      margin: 1rem 0;
      .set-item {
        margin-left: 5rem;
        .item-label {
          width: 20rem;
          display: inline-block;
          font-size: 1.5rem;
          font-weight: bold;
          text-align: right;
          padding-right: 4rem;
          vertical-align: text-top;
        }
        .item-content {
          font-size: 1.5rem;
          font-weight: bold;
          vertical-align: text-top;
        }
        .change-edit {
          float: right;
          margin-right: 10rem;
        }
      }
      .ivu-input-wrapper {
        width: 45rem;
        margin: 1rem 0;
      }
    }
  }
  .security-set {
    .ivu-input-wrapper {
      width: 50rem;
      margin: 1rem 2rem;
    }
    .set-item {
      margin-left: 5rem;
    }
  }
}
</style>
<template>
  <div class="detail-info">
    <h2 class="datail-title">邮箱修改</h2>
      <Divider />
      <div class="set-item">
        <span>邮箱</span>
        <i-input type="password" v-model="securityForm.password" placeholder="输入账号密码"></i-input>
      </div>
      <h2 class="datail-title">密码修改</h2>
      <Divider />
      <div class="set-item">
        <span>原密码</span>
        <i-input type="password" v-model="securityForm.password" placeholder="输入账号密码"></i-input>
      </div>
      <div class="set-item">
        <span>新密码</span>
        <i-input type="password" v-model="securityForm.reconfirmPass" placeholder="确认密码输入"></i-input>
      </div>
      <h2 class="datail-title">密码重置</h2>
      <Divider />
      <div class="set-item">
        <span>邮箱</span>
        <i-input type="password" v-model="securityForm.password" placeholder="输入账号密码"></i-input>
      </div>
      <div class="set-item">
        <span>验证码</span>
        <i-input type="password" v-model="securityForm.reconfirmPass" placeholder="确认密码输入"></i-input>
      </div>
      <div class="set-item">
        <span>新密码</span>
        <i-input type="password" v-model="securityForm.reconfirmPass" placeholder="确认密码输入"></i-input>
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
      userSchoolInfo: USER_SCHOOL_INFO,
      copyData: this.userBaseInfo,
      securityForm: {
        password: '',
        reconfirmPass: ''
      },
    }
  },
  watch: {
    copyData() {
      return this.userBaseInfo;
    }
  },
  methods: {
    changeCommonSetStatus(identify) {
      this.copyData = JSON.parse(JSON.stringify(this.userBaseInfo));
      if (this.schoolSetIndex === -1) {
        this.schoolSetIndex = identify;
      }
      else {
        this.schoolSetIndex = -1;
      }
    },
    submitUpdate(key) {
      this.$emit('submitUpdate', {
        key,
        value: this.copyData.schoolData[key],
        type: 'school'
      });
    }
  }
}
</script>
