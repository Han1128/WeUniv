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
        padding: 2rem;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
        .item-label {
          width: 20rem;
          display: inline-block;
          text-align: left;
          font-size: 1.5rem;
          font-weight: bold;
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
    <!-- 在校信息设置 -->
    <h2 class="datail-title">在校信息</h2>
    <Divider />
    <ul class="common-setting">
      <li v-for="(item, index) in userSchoolInfo" :key="item.value">
        <div class="set-item">
          <div class="item-label">{{item.label}}</div>
          <span class="item-content" v-show="schoolSetIndex !== index">
            {{getSchoolInfo(item.value)}}
          </span>
          <i-input
            type="text"
            v-show="schoolSetIndex === index"
            v-model="copySchoolData.schoolData[item.value]"
            :placeholder="item.placeholder">
          </i-input>
          <a class="change-edit"
            v-show="schoolSetIndex !== index" href="javascript:void(0)"
            @click="changeCommonSetStatus(index)">编辑
          </a>
          <span v-show="schoolSetIndex === index">
            <Button @click="submitUpdate(item.value)">保存</Button>
            <Button @click="changeCommonSetStatus(index)">取消</Button>
          </span>
        </div>
      </li>
    </ul>
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
      schoolSetIndex: -1,
      userSchoolInfo: USER_SCHOOL_INFO,
      copySchoolData: this.userBaseInfo
    }
  },
  created() {
  },
  watch: {
    userBaseInfo(val) {
      this.copySchoolData = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    getSchoolInfo(value) {
      return this.userBaseInfo && this.userBaseInfo.schoolData && this.userBaseInfo.schoolData[value] ? this.userBaseInfo.schoolData[value] : '快来补充吧~' ;
    },
    changeCommonSetStatus(identify) {
      this.copySchoolData = JSON.parse(JSON.stringify(this.userBaseInfo));
      if (this.schoolSetIndex === -1) {
        this.schoolSetIndex = identify;
      }
      else {
        this.schoolSetIndex = -1;
      }
    },
    submitUpdate(key) {
      this.schoolSetIndex = -1;
      this.$emit('submitUpdate', {
        key,
        value: this.copySchoolData.schoolData[key],
        type: 'school'
      });
    }
  }
}
</script>
