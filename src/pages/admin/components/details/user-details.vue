<style lang="less" scoped>
.user-details {

}
</style>
<template>
  <div class="user-details">
    <Form :model="userData" :label-width="100">
        <FormItem label="id">
          <span>{{userData._id}}</span>
        </FormItem>
        <FormItem label="用户名">
          <img :src="userData.avatar" style="height: 4rem;border-radius: 4rem;">
        </FormItem>
        <FormItem label="用户名">
          <span>{{userData.username}}</span>
        </FormItem>
        <FormItem label="邮箱">
          <span>{{userData.email}}</span>
        </FormItem>
        <FormItem label="用户类型">
          <strong>{{userData.userType === 'student' ? '学生' : userData.userType === 'teacher' ? '教师' : '机构' }}</strong>
        </FormItem>
        <FormItem label="性别">
          <strong>{{userData.gender ? '男' : '女' }}</strong>
        </FormItem>
        <FormItem label="生日">
          <Time :time="userData ? userData.birth : ''" type="date" />
        </FormItem>
        <FormItem label="爱好">
          <Tag v-for="item in userData.hobby_tags" :key="item" color="primary">{{item}}</Tag>
        </FormItem>
        <FormItem label="描述">
          <strong>{{userData.description}}</strong>
        </FormItem>
        <FormItem label="创建时间">
          <Time :time="userData ? userData.createTime : ''" type="date" />
        </FormItem>
        <FormItem label="学校">
          <strong>{{ userData.schoolData ? userData.schoolData.schoolName : ''}}</strong>
        </FormItem>
        <FormItem label="学院">
          <strong>{{ userData.schoolData ? userData.schoolData.Institute : ''}}</strong>
        </FormItem>
        <FormItem label="年级">
          <strong>{{ userData.schoolData ? userData.schoolData.grade : ''}}</strong>
        </FormItem>
        <FormItem label="专业">
          <strong>{{ userData.schoolData ? userData.schoolData.profession : ''}}</strong>
        </FormItem>
        <FormItem label="学号">
          <strong>{{ userData.schoolData ? userData.schoolData.schoolId : ''}}</strong>
        </FormItem>
        <FormItem label="班级">
          <strong>{{ userData.schoolData ? userData.schoolData.class : ''}}</strong>
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
      userData: {} // 对象拷贝
    }
  },
  watch: {
    userDetails() {
      this.userData = JSON.parse(JSON.stringify(this.userDetails));
    }
  },
  methods: {
    getStaticsData() {

    }
  }
}
</script>
