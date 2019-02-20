<style lang="less" scoped>
.quill-editor {
  .ivu-input-wrapper {
    margin: 1.5rem 0;
    /deep/.ivu-input {
      height: 3.5rem;
      padding: 0 1.5rem;
      font-size: 1.5rem;
    }
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
}
</style>
<template>
  <div class="quill-editor">
    <Input v-model="articleForm.title" placeholder="标题:用一句话来描述你的文章" />
    <!-- 图片上传组件辅助-->
    <Upload
      id="iviewUp"
      ref="upload"
      type="drag"
      name="upload"
      :data="uploadData"
      :action="serverUrl"
      :headers="header"
      :show-upload-list="false"
      :format="['jpg','jpeg','png']"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-format-error="uploadFormatError"
      style="display: none;width:0">
      <div style="width: 0">
        <Icon type="ios-camera" size="50"></Icon>
      </div>
    </Upload>
    <quill-editor v-model="articleForm.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
    </quill-editor>
    <!-- <div class="quill-code">
      <Code class="hljs" v-html="contentCode"></Code>
    </div> -->
    <Spin fix v-show="spinshow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'highlight.js/styles/monokai-sublime.css'

import hljs from 'highlight.js'
import { quillEditor, Quill } from 'vue-quill-editor';
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module'; // 调整图片大小
import { EDIT_OPTIONS, TOOL_BAR_OPTIONS } from '../common/index.js';

const Font = Quill.import('formats/font');
Font.whitelist = ['Arial', '宋体', '黑体', '微软雅黑', '楷体', '仿宋'];
Quill.register(Font, true);
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)
export default {
  components: { quillEditor },
  data () {
    return {
      spinshow: false, // 定义是否正在加载
      articleForm: {
        title: '',
        content: '', // 内容其实是纯html代码
      },
      uploadData: {
        url: ''
      },
      editorOption: EDIT_OPTIONS,
      // editorOption: {
      //   placeholder: '写点什么吧...',
      //   theme: 'snow',
      //   modules: {
      //     toolbar: {
      //       container: TOOL_BAR_OPTIONS,  // 工具栏
      //       handlers: {
      //         'image': function (value) {
      //           if (value) {
      //             // 触发input框选择图片文件
      //             document.querySelector('#iviewUp input').click();
      //           } else {
      //             this.quill.format('image', false);
      //           }
      //         }
      //       }
      //     },
      //     history: {
      //       delay: 1000,
      //       maxStack: 50,
      //       userOnly: false
      //     },
      //     imageDrop: true,
      //     imageResize: {
      //       displayStyles: {
      //         backgroundColor: 'black',
      //         border: 'none',
      //         color: 'white'
      //       },
      //       modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
      //     },
      //   }
      // },
      serverUrl: '/api/uploadArticlePic',
      header: { token: localStorage.token },  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    contentCode() {
      return hljs.highlightAuto(this.articleForm.content).value
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor);
    this.$set(this.editorOption.modules, 'syntax', {
      highlight: text => hljs.highlightAuto(text).value
    })
  },
  methods: {
    // 文件上传之前
    beforeUpload(file) {
      // 使用reader来读取上传文件数据
      this.spinshow = true;
      let reader = new FileReader();
      reader.readAsDataURL(file)
      let _this = this;
      reader.onloadend = function (e) {
        _this.uploadData.url = reader.result;
        file.url = reader.result;
      }
    },
    // 文件上传成功
    uploadSuccess(res, file) {
      let quill = this.$refs.myQuillEditor.quill;
      // console.log('res---', this.$refs.myQuillEditor.quill.getSelection())
      // 如果上传成功
      if (res.success) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片 res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$Message.error('图片插入失败');
      }
      this.spinshow = false;
    },
    uploadError(res, file) {

    },
    uploadFormatError(file) {

    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.articleForm.content = html
    },
    // 表单提交
    articleConfirm() {
      //TODO:表单校验
      if (this.articleForm.content === '') return;
      this.spinshow = true;
      const userid = localStorage.getItem('userid');
      const username = localStorage.getItem('username');
      const data = {
        title: this.articleForm.title,
        content: this.articleForm.content,
        userid,
        username,
        type: 'long',
        author: 'admin',
        public_date: new Date()
      }
      this.axios.post('/addArticleContent', data)
      .then(res => {
        console.log('res', res);
        this.$Message.success('文章提交成功');
        this.$emit('turnPage');
      })
      .catch(err => {
        console.error('err', err);
        this.$Message.error('文章提交失败');
      })
      .finally(_ => {
        this.spinshow = false;
      })
    }
  }
}
</script>
