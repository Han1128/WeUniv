<style lang="less" scoped>
.wang-editor {
  margin: 2rem;
  .ivu-input-wrapper {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    /deep/.ivu-input {
      height: 4rem;
      font-size: 1.5rem;
      padding-left: 2rem;
    }
  }
  /deep/.w-e-menu {
    z-index: 2 !important;
  }
  /deep/.w-e-text-container {
    z-index: 1 !important;
  }
  .upload-label {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 2rem;
  }
  .article-bg-upload {
    padding: 0;
    /deep/.ivu-upload {
      width: 30rem;
      margin: 1rem 0;
    }
  }
}
</style>
<template>
  <div class="wang-editor">
    <Input v-model="editorTitle" placeholder="标题:用一句话来描述你的文章" />
    <div>
      <span>是否置顶:</span>
      <i-switch v-model="setTop"/>
      <div>
        <Input v-model="editorTags" placeholder="选择您文章的类型">
          <div slot="prepend">
            <Tag checkable color="primary">电影</Tag>
            <Tag checkable color="success">英语</Tag>
            <Tag checkable color="error">音乐</Tag>
            <Tag checkable color="warning">社团</Tag>
          </div>
        </Input>
      </div>
    </div>
    <div id="editorElem" ref="editorElem" style="text-align:left"></div>
    <p class="upload-label">上传一张图片作为封面大图吧~</p>
    <img-upload
      class="article-bg-upload"
      :fixed="true"
      :fixedNumber="[4,3]"
      :submitType="'articleBg'"
      @cropperSuccess="cropperSuccess">
      <div slot="upload-btn" style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
      </div>
    </img-upload>
    <template class="uplload-list" v-if="articleCoverBg">
      <img :src="articleCoverBg"/>
      <Button type="primary" icon="ios-trash-outline" @click="removeImg">删除</Button>
    </template>
    <Spin fix v-show="spinshow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
    </Spin>
  </div>
</template>
<script>
import bus from '../common/bus.js'
import E from 'wangeditor'
import imgUpload from '@/pages/user/components/Img-upload-component'
export default {
  name: 'editor',
  components: { imgUpload },
  data () {
    return {
      spinshow: false,
      setTop: false,
      fileType: '',
      editorTitle: '',
      editorContent: '',
      articleCoverBg: '',
      editorTags: '',
      articleTags: [
        {
          label: '电影',
          value: 'MOVIE'
        },
        {
          label: '音乐',
          value: 'MUSIC'
        },
        {
          label: '四六级',
          value: 'SET'
        }
      ]
    }
  },
  mounted() {
    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    editor.create()
  },
  methods: {
    removeImg() {
      this.articleCoverBg = '';
    },
    cropperSuccess(result) {
      this.articleCoverBg = result;
    },
    articleConfirm() {
      // 校验
      this.spinshow = true;
      const userid = localStorage.getItem('userid');
      const username = localStorage.getItem('username');
      const data = {
        userid,
        username,
        type: 'long',
        viewsTime: 0,
        isTop: this.setTop,
        coverBg: this.articleCoverBg,
        bgType: this.fileType,
        tags: ['音乐', '电影', '四六级'],
        title: this.editorTitle,
        content: this.editorContent,
        public_date: new Date()
      }
      this.axios.post('/addArticleContent', data)
      .then(res => {
        console.log('res', res);
        this.$Message.success('文章提交成功');
        this.$emit('turnPage', res.data.articleid);
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
