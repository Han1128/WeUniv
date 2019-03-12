<style lang="less" scoped>
.article-gallery-list {
  margin-top: 2rem;
  border: 1px solid #d8d8d8;
  box-shadow: -1px -1px 5px #d9d9d9;
  .gallery-list {
    overflow: hidden;
    li {
      float: left;
      position: relative;
      .short-img {
        height: 20rem;
        margin: 1.5rem;
      }
      .long-img {
        width: 33rem;
        height: 20rem;
        margin: .5rem 0;
        margin-left: 1.3rem;
      }
    }
  }
  .bottom-tip {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-top: 2rem;
    padding-top: 1rem;
    margin-bottom: 1rem;
    cursor: default;
    // border-top: 1px dashed #ccc;
  }
}
</style>
<template>
  <div class="article-gallery-list">
    <ul class="gallery-list">
      <li
        v-for="(short, index) in gallery[0]"
        :key="index">
        <img
          class="short-img"
          v-for="item in short.coverBg"
          :key="item"
          :src="item">
      </li>
    </ul>
    <ul class="gallery-list">
      <li
        v-for="(long, index) in gallery[1]"
        :key="index">
        <img
          class="long-img"
          :src="long.coverBg[0]">
      </li>
    </ul>
    <p class="bottom-tip">已经到底了~</p>
  </div>
</template>
<script>
export default {
  props: {
    galleryList: {
      type: Array,
      default: _ => []
    }
  },
  data () {
    return {
      gallery: this.galleryList
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
