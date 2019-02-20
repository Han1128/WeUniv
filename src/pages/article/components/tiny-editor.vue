<style lang="less" scoped>

</style>
<template>
  <div>
    <editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
    'editor': Editor
  },
  data () {
    return {
      tinymceHtml: '',
      editorInit: {
        // language_url: '/static/tinymce/zh_CN.js',
        // language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300
      }
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {

  }
}
</script>
