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
    <!-- 常规修改 -->
    <div v-if="settingType === 'generalSet'">
      <user-general-info :userBaseInfo="userBaseInfo" @submitUpdate="submitUpdate"></user-general-info>
    </div>
    <!-- 在校信息设置 -->
    <div v-if="settingType === 'schoolInfoSet'">
      <user-school-info :userBaseInfo="userBaseInfo" @submitUpdate="submitUpdate"></user-school-info>
    </div>
    <!-- 安全设置 -->
    <div v-show="settingType === 'securitySet'" class="security-set">
      <user-security-info :userBaseInfo="userBaseInfo" @submitUpdate="submitUpdate"></user-security-info>
    </div>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import { UN_MODIFY_INFO, USER_COMMON_LIST, USER_SCHOOL_INFO } from './common/index.js';
import userGeneralInfo from './components/user-general-info';
import userSchoolInfo from './components/user-school-info';
import userSecurityInfo from './components/user-security-info';
export default {
  props: {
    settingType: {
      type: String
    }
  },
  components: {
    userSchoolInfo,
    userGeneralInfo,
    userSecurityInfo
  },
  data () {
    return {
      userId: '',
      userBaseInfo: {},
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getUserInfo();
  },
  methods: {
    submitUpdate(updateItem) {
      let api = updateItem.type === 'school' ? '/updateUserSchoolInfo' : '/updateUserInfo';
      this.axios.post(api, {
        userId: this.userId,
        key: updateItem.key,
        value: updateItem.value
      })
      .then(res => {
        this.$Notice.success({ title: '提示',  desc: '修改信息成功!' });
        this.getUserInfo();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.userId
        }
      })
      .then(res => {
        this.userBaseInfo = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
