export default {
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: localStorage.getItem('userid')
        }
      })
      .then(res => {
        localStorage.removeItem('userData');
        localStorage.setItem('userData', JSON.stringify(res.data.result));
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
  }
}
