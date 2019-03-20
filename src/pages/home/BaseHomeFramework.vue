<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    background:#F6F6F6;
    .page-bg {
        position: absolute;
        top: 0;
        bottom: 0;
        left:0;
        right:0;
    }
    .footer {
      text-align: center;
    }
  }
</style>
<template>
  <div class="home">
    <g-header></g-header>
    <g-bgcover></g-bgcover>
    <!-- <div id="particles-js" class="page-bg"></div> -->
    <router-view></router-view>
    <div class="footer">footer</div>
  </div>
</template>
<script>
import 'particles.js';
import homePageContent from './components/HomePageContent'
export default {
  components: { homePageContent }
}
</script>
