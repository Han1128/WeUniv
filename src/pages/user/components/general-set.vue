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
}
</style>
<template>
  <div class="detail-info">
    <!-- 常规修改 -->
    <div v-show="settingType === 'generalSet'">
      <h2 class="datail-title">常规信息</h2>
      <Divider/>
      <Form :model="userBaseInfo" label-position="left" :label-width="120">
          <FormItem label="用户名">
              {{userBaseInfo.username}}
          </FormItem>
          <FormItem label="性别">
              {{userGender}}
          </FormItem>
          <FormItem label="身份">
              {{userBaseInfo.userType}}
          </FormItem>
          <FormItem label="创建时间">
              {{userBaseInfo.createTime}}
          </FormItem>
      </Form>
      <h2 class="datail-title">常规修改</h2>
      <Divider />
      <Form :model="userBaseInfo" label-position="left" :label-width="120">
        <FormItem label="出生日期">
            <Input v-model="userBaseInfo.birth" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="手机">
              <!-- <Input v-model="userBaseInfo.phone" placeholder="Enter something..."></Input> -->
        </FormItem>
        <FormItem label="微信">
              <!-- <Input v-model="userBaseInfo.input" placeholder="Enter something..."></Input> -->
        </FormItem>
        <FormItem label="QQ">
              <!-- <Input v-model="userBaseInfo.input" placeholder="Enter something..."></Input> -->
        </FormItem>
        <FormItem label="个人描述">
            <p>
              <Input v-model="userBaseInfo.input" placeholder="Enter something..."></Input>
            </p>
        </FormItem>
      </Form>
      <h2 class="datail-title">爱好标签</h2>
      <Divider/>
    </div>
    <!-- 在校信息设置 -->
    <div v-show="settingType === 'schoolInfoSet'">
      <h2 class="datail-title">在校信息</h2>
      <Divider />
      <Form :model="userBaseInfo" label-position="left" :label-width="120">
          <FormItem label="学校">
              <p>肇庆学院</p>
          </FormItem>
          <FormItem label="学院">
              计算机学院
          </FormItem>
          <FormItem label="学号">
             201524131219
          </FormItem>
          <FormItem label="年级">
             2015
          </FormItem>
          <FormItem label="专业">
              计算机科学与技术
          </FormItem>
      </Form>
    </div>
    <!-- 安全设置 -->
    <div v-show="settingType === 'securitySet'">
      <h2 class="datail-title">安全设置</h2>
      <Divider />
      <Form :model="securityForm" label-position="left" :label-width="120">
          <FormItem label="邮箱">
              <i-input type="password" v-model="securityForm.password" placeholder="输入账号密码"></i-input>
          </FormItem>
          <FormItem label="密码">
              <i-input type="password" v-model="securityForm.password" placeholder="输入账号密码"></i-input>
          </FormItem>
          <FormItem label="密码确认">
              <i-input type="password" v-model="securityForm.reconfirmPass" placeholder="确认密码输入"></i-input>
          </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    settingType: {
      type: String
    }
  },
  data () {
    return {
      userBaseInfo: {
        username: '',
        gender: '',
        email: '',
        description: '',
        userType: '',
        birth: '',
        createTime: '',
        avatar: ''
      },
      securityForm: {
        password: '',
        reconfirmPass: ''
      }
    }
  },
  created() {
    this.userBaseInfo = Object.assign({}, this.userBaseInfo, JSON.parse(localStorage.getItem('userData')));
  },
  computed: {
    userGender() {
      return this.userBaseInfo.gender ? '男' : '女';
    }
  },
  methods: {

  }
}
</script>
