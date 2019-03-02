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
      <!-- <ul class="common-setting">
        <li v-for="item in unModifyInfo" :key="item.value">
          <div class="set-item">
            <div class="item-label">{{item.label}}</div>
            <span class="item-content" >{{userBaseInfo[item.value]}}</span>
          </div>
        </li>
      </ul> -->
      <h2 class="datail-title">常规修改</h2>
      <Divider />
      <ul class="common-setting">
        <li v-for="(item,index) in userCommonList" :key="item.value">
          <div class="set-item">
            <div class="item-label">{{item.label}}</div>
            <span class="item-content" v-show="commonSetIndex !== index">{{userBaseInfo[item.value] || '快来补充吧~'}}</span>
            <i-input
              type="text"
              v-show="commonSetIndex === index"
              v-model="userBaseInfo[item.value]"
              :placeholder="item.placeholder">
            </i-input>
            <a class="change-edit"
              v-show="commonSetIndex !== index" href="#"
              @click="changeCommonSetStatus(index)">编辑
            </a>
            <span v-show="commonSetIndex === index">
              <Button>保存</Button>
              <Button @click="changeCommonSetStatus(index)">取消</Button>
            </span>
          </div>
        </li>
      </ul>
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
    <div class="security-set" v-show="settingType === 'securitySet'">
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
      commonSetIndex: -1, // 常规设置显示编辑
      unModifyInfo: [
        {
          label: '同户名',
          value: 'username',
          placeholder: '请输入'
        },
        {
          label: '性别',
          value: 'gender',
          placeholder: '请输入'
        },
        {
          label: '身份',
          value: 'userType',
          placeholder: '请输入'
        },
        {
          label: '创建时间',
          value: 'createTime',
          placeholder: '请输入'
        }
      ],
      userCommonList: [
        {
          label: '出生日期',
          value: 'birth',
          placeholder: '请输入'
        },
        {
          label: '手机',
          value: 'phone',
          placeholder: '请输入'
        },
        {
          label: '微信',
          value: 'wechat',
          placeholder: '请输入'
        },
        {
          label: 'QQ',
          value: 'QQ',
          placeholder: '请输入'
        },
        {
          label: '个人签名',
          value: 'description',
          placeholder: '请输入'
        }
      ],
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
    changeCommonSetStatus(index) {
      if (this.commonSetIndex === -1) {
        this.commonSetIndex = index;
      }
      else {
        this.commonSetIndex = -1;
      }
    }
  }
}
</script>
