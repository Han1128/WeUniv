<style lang="less" scoped>
.g-emoji {
  width: 30rem;
  height: 30rem;
  position: absolute;
  border-radius: .4rem;
  overflow-y: scroll;
  border: 1px solid #ccc;
  box-shadow: 0 4px 20px 1px rgba(0,0,0,0.2);
  background: #fff;
  z-index: 1000;
  .emoji-panel {
    overflow: hidden;
    padding: 0.5rem 0;
    padding-left: .5rem;
    .emoji-list {
      float: left;
      font-size: 2rem;
      padding: .2rem;
      cursor: pointer;
      &:hover {
        border-radius: 3rem;
        background: #ccc;
      }
    }
  }
  /* 滚动槽 */
  &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
  }
  &::-webkit-scrollbar-track {
      border-radius: 8px;
      background: rgba(0,0,0,0.06);
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(0,0,0,0.12);
      -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
  }
}
</style>
<template>
  <div class="g-emoji">
    <ul class="emoji-panel">
      <li class="emoji-list" v-for="(item,index) in emoji" :key="index" @click="emojiOnClick(item)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import { EMOJI } from './emoji.js';
export default {
  name: 'g-emoji',
  data () {
    return {
      emoji: EMOJI
    }
  },
  methods: {
    emojiOnClick(item) {
      this.$emit('emojiClick', item);
    }
  }
}
</script>
