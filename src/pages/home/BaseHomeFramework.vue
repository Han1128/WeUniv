<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    .footer {
      text-align: center;
    }
  }
</style>
<template>
  <div class="home">
    <g-header></g-header>
    <home-page-content></home-page-content>
    <div class="footer">footer</div>
  </div>
</template>
<script>
import homePageContent from './components/HomePageContent'
export default {
  components: { homePageContent },
  data () {
    return {
      userid: '',
      userDetails: {}
    }
  },
  created() {
    this.userid = localStorage.getItem('userid');
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.userid
        }
      })
      .then(res => {
        console.log('res', res)
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        this.userDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>
