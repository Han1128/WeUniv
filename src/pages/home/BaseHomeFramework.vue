<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
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

    }
  },
  methods: {

  }
}
</script>
