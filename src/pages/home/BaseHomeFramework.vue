<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    background: #eee;
    .footer {
      text-align: center;
    }
  }
</style>
<template>
  <div class="home">
    <g-header></g-header>
    <!-- <home-page-content></home-page-content> -->
    <router-view></router-view>
    <div class="footer">footer</div>
  </div>
</template>
<script>
import homePageContent from './components/HomePageContent'
export default {
  components: { homePageContent }
}
</script>
