<style lang="less" scoped>
.user-details {

}
</style>
<template>
  <div class="user-details">
    <Form :model="userData" :label-width="100">
        <FormItem label="id">
            <i-input v-model="userData._id" disabled placeholder="Enter something..."></i-input>
        </FormItem>
        <FormItem label="用户名">
            <i-input v-model="userData.username" placeholder="修改用户名"></i-input>
        </FormItem>
        <FormItem label="邮箱">
            <i-input v-model="userData.email" placeholder="修改邮箱"></i-input>
        </FormItem>
        <FormItem label="密码">
            <i-input v-model="userData.password" placeholder="重置密码"></i-input>
        </FormItem>
        <FormItem label="用户类型">
            <Select v-model="userData.userType">
                <Option value="student">学生</Option>
                <Option value="teacher">教师</Option>
                <Option value="institution">机构</Option>
            </Select>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="userData.gender">
                <Radio label="1">男</Radio>
                <Radio label="0">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="是否有效">
            <i-switch v-model="userData.status" size="large">
                <span slot="open">有效</span>
                <span slot="close">无效</span>
            </i-switch>
        </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
    userDetails: {
      type: Object,
      default: _ => {}
    }
  },
  data () {
    return {
      userData: {}, // 对象拷贝
    }
  },
  watch: {
    userDetails() {
      this.userData = JSON.parse(JSON.stringify(this.userDetails));
      this.userData.password = '';
       this.userData.status = this.userData.status ? true : false;
    }
  },
  methods: {
    confirm() {
      this.axios.post('/updateUserByAdmin', {
        userId: this.userData._id,
        username: this.userData.username,
        email: this.userData.email,
        userType: this.userData.userType,
        password: this.userData.password,
        gender: this.userData.gender,
        status: this.userData.status? 1 : 0,
      })
      .then(res => {
        this.$Notice.success({ title: '提示',  desc: '修改成功' });
        this.$emit('success');
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    }
  }
}
</script>
