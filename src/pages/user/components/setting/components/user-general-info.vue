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
    width: 100%;
    margin: 0 auto;
    padding: 0 3rem;
    .ivu-form-item {
      padding: 1rem 2rem;
      border-bottom: 1px dashed rgba(0,0,0,.15);
      /deep/.ivu-form-item-label {
        width: 100px;
        font-size: 1.4rem;
        font-weight: bolder;
      }
      /deep/.ivu-form-item-content {
        margin-left: 20rem;
        font-size: 1.5rem;
        font-weight: bold;
        padding-left: 5rem;
      }
    }
  }
  .common-setting {
    li {
      margin: 1rem 0;
      .set-item {
        margin-left: 5rem;
        padding: 2rem;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
        .item-label {
          width: 20rem;
          display: inline-block;
          font-size: 1.5rem;
          font-weight: bold;
          text-align: left;
          padding-right: 4rem;
          vertical-align: text-top;
        }
        .item-content {
          font-size: 1.5rem;
          font-weight: bold;
          vertical-align: text-top;
        }
        .ivu-input-wrapper {
          margin: 0;
        }
        .change-edit {
          float: right;
          margin-right: 10rem;
        }
        .avatar {
          float: left;
          padding-top: 4rem;
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
      <h2 class="datail-title">常规信息</h2>
      <Divider/>
      <Form :model="userBaseInfo" label-position="left" :label-width="200">
          <FormItem label="用户名">
              {{userBaseInfo.username}}
          </FormItem>
          <FormItem label="邮箱">
              {{userBaseInfo.email}}
          </FormItem>
          <FormItem label="性别">
              {{userGender}}
          </FormItem>
          <FormItem label="身份">
              {{userBaseInfo.userType}}
          </FormItem>
          <FormItem label="创建时间">
            <Time :time="getCreateTime" type="datetime" />
          </FormItem>
      </Form>
      <h2 class="datail-title">常规修改</h2>
      <Divider />

      <ul class="common-setting">
        <li>
          <div class="set-item">
            <div class="item-label avatar">头像更改</div>
            <upload-img></upload-img>
          </div>
        </li>
        <li>
          <div class="set-item">
            <div class="item-label">出生日期</div>
            <span class="item-content" v-show="!showbirthInput">
              {{copyUserData.birth || '快来补充吧~'}}
            </span>
            <DatePicker
              v-show="showbirthInput"
              v-model="copyUserData.birth"
              type="date"
              :options="dateOption"
              placement="bottom-end"
              placeholder="输入或选择日期"
              >
            </DatePicker>
            <a class="change-edit"
              v-show="!showbirthInput" href="javascript:void(0)"
              @click="changeCommonSetStatus('birth')">编辑
            </a>
            <span v-show="showbirthInput">
              <Button @click="submitUpdate('birth')">保存</Button>
              <Button @click="changeCommonSetStatus('birth')">取消</Button>
            </span>
          </div>
        </li>
        <li v-for="(item,index) in userCommonList" :key="item.value">
          <div class="set-item">
            <div class="item-label">{{item.label}}</div>
            <span class="item-content" v-show="commonSetIndex !== index">{{userBaseInfo[item.value] || '快来补充吧~'}}</span>
            <i-input
              type="text"
              v-show="commonSetIndex === index"
              v-model="copyUserData[item.value]"
              :placeholder="item.placeholder">
            </i-input>
            <a class="change-edit"
              v-show="commonSetIndex !== index" href="javascript:void(0)"
              @click="changeCommonSetStatus(index)">编辑
            </a>
            <span v-show="commonSetIndex === index">
              <Button @click="submitUpdate(item.value)">保存</Button>
              <Button @click="changeCommonSetStatus(index)">取消</Button>
            </span>
          </div>
        </li>
      </ul>
      <h2 class="datail-title">爱好标签</h2>
      <Divider/>
      <div style="margin-left: 5rem;">
        <Tag
          :color="randomColor()"
          v-for="item in userBaseInfo.hobby_tags"
          :key="item">
          {{item}}
        </Tag>
        <transition name="slide">
          <router-link tag="a" class="topic-item" to="/home/tag">
          <Icon type="md-pricetags"/>去获得更多标签</router-link>
        </transition>
      </div>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import uploadImg from '../upload-img'
import { UN_MODIFY_INFO, USER_COMMON_LIST, USER_SCHOOL_INFO, day_option } from '../common/index.js'
export default {
  props: {
    userBaseInfo: {
      type: Object
    }
  },
  components: {uploadImg},
  data () {
    return {
      commonSetIndex: -1, // 常规设置显示编辑
      showbirthInput: false, // 是否显示出生日期
      unModifyInfo: UN_MODIFY_INFO, // 不可编辑部分
      userCommonList: USER_COMMON_LIST, // 常规部分
      copyUserData: this.userBaseInfo, // 拷贝一份
      dateOption: day_option
    }
  },
  computed: {
    userGender() {
      return this.userBaseInfo.gender ? '男' : '女';
    },
    formatUserBirth() {
      const birth = this.userBaseInfo.birth
      return `${new Date(birth).getFullYear()}-${new Date(birth).getMonth() + 1}-${new Date(birth).getDate()}`
    },
    getCreateTime() {
      if (!this.userBaseInfo.createTime) return new Date();
      return this.userBaseInfo.createTime;
    }
  },
  watch: {
    copyUserData() {
      return this.userBaseInfo;
    }
  },
  methods: {
    randomColor() {
      const colorList = ['primary', 'success', 'purple', 'error', 'warning'];
      let index = Math.floor((Math.random() * colorList.length));
      return colorList[index];
    },
    changeCommonSetStatus(identify) {
      if(identify === 'birth') {
        this.showbirthInput = !this.showbirthInput;
      }
      else if (this.commonSetIndex === -1) {
        this.commonSetIndex = identify;
      }
      else {
        this.commonSetIndex = -1;
      }
    },
    submitUpdate(key) {
      this.commonSetIndex = -1;
      this.$emit('submitUpdate', {
        key,
        value: this.copyUserData[key],
        type: 'user'
      });
    }
  }
}
</script>
