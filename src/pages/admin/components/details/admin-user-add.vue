<style lang="less" scoped>
.admin-user-add {
}
</style>
<template>
  <div class="admin-user-add">
    <Form ref="userRegister" :model="registerForm" label-position="right" :rules="ruleValidate" :label-width="100">
        <FormItem label="用户名" prop="username">
          <i-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            @on-blur="checkInput('username')">
          </i-input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <i-input
              v-model="registerForm.email"
              placeholder="输入邮箱作为登录账号"
              @on-blur="checkInput('email')">
            </i-input>
        </FormItem>
        <FormItem label="性别">
            <RadioGroup v-model="registerForm.gender">
                <Radio label="1">我是男生</Radio>
                <Radio label="0">我是女生</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="用户类型" prop="userType">
          <Select v-model="registerForm.userType" placeholder="请选择用户类型">
              <Option v-for="item in userTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="出生日期" prop="birth">
          <DatePicker
            v-model="registerForm.birth"
            format="yyyy-MM-dd"
            type="date"
            placeholder="请选择出生日期">
          </DatePicker>
        </FormItem>
        <FormItem label="密码" prop="password">
            <i-input type="password" v-model="registerForm.password" placeholder="输入账号密码"></i-input>
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
    let _this = this
    var validUserExist = function(rule, value, callback) {
      if (_this.userExist) {
        return callback(new Error("该用户已存在"));
      } else {
        callback();
      }
    }
    var validEmailExist = function(rule, value, callback) {
      if (_this.emailExist) {
        return callback(new Error("该邮箱已存在"))
      } else {
        callback();
      }
    }
    return {
      userExist: false,
      emailExist: false,
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
      registerForm: {
        username: '',
        birth: '',
        userType: '',
        gender: '1',
        email: '',
        password: '',
      },
      ruleValidate: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { validator: validUserExist, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
            { validator: validEmailExist, trigger: 'blur' }
          ],
          userType: [
            { required: true, message: '请选择用户类型', trigger: 'change' }
          ],
          birth: [
            { required: true, type: 'date', message: '请选择出生日期', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
    checkInput(type) {
      if (type === 'username' && !this.registerForm.username
        || type === 'email' && !this.registerForm.email) return;
      this.axios.get('/checkUserExist', {
        params: {
          checkType: type,
          checkData: type === 'username' ? this.registerForm.username : this.registerForm.email
        }
      })
      .then(res => {
        if (type === 'username') {
          this.userExist = false
        }
        else {
          this.emailExist = false
        }
      })
      .catch(err => {
        if (type === 'username') {
          this.userExist = true
        }
        else {
          this.emailExist = true
        }
      })
      .finally(_ => {
        if (type === 'username') {
          this.$refs.userRegister.validateField('username')
        }
        else {
          this.$refs.userRegister.validateField('email')
        }
      })
    },
    handleSubmit () {
      this.$refs.userRegister.validate((valid) => {
        if (valid) {
          this.axios.post('/addUserByAdmin', {
            username: this.registerForm.username,
            email: this.registerForm.email,
            birth: this.registerForm.birth,
            userType: this.registerForm.userType,
            password: this.registerForm.password,
            gender: this.registerForm.gender,
          })
          .then(res => {
            this.$Notice.success({ title: '提示',  desc: '添加成功' });
            this.$emit('success');
          })
          .catch(err => {
            this.$Notice.error({ title: '提示',  desc: err.message });
          })
          .finally(_=> {
            this.registerForm();
          })
        }
      })
    },
    handleReset (name) {
      this.$refs.userRegister.resetFields();
    }
  }
}
</script>
