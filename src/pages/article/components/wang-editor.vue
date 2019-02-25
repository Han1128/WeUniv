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
  .article-config {
    margin-bottom: 2rem;
    .is-top {
      float: left;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.7rem;
      padding-left: 1rem;
      .ivu-switch-checked {
        border-color: #009a61;
        background-color: #009a61;
      }
    }
    .ivu-input-group-prepend {
      background: none;
    }
    .ivu-input-wrapper {
      width: calc(100% - 160px);
      margin-left: 16rem;
      margin-bottom: .5rem;
      /deep/.ivu-input-group-prepend {
        background: none;
      }
      /deep/.ivu-input {
        border-left: none;
        padding-left: .5rem;
        &:hover {
          border-color: #dcdee2;
        }
        &:focus {
          border-color: #dcdee2;
          box-shadow: none;
        }
      }
    }
    .tags-panel {
      width: 50rem;
      height: 20rem;
      border: 1px solid #ccc;
      margin-left: 16rem;
      position: absolute;
      z-index: 3;
      background: #fff;
      .tags-list {
        overflow: hidden;
        padding: 1rem 1.5rem;
        .tags-list-item {
          float: left;
          margin-right: 1rem;
        }
        /deep/.ivu-tag {
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          padding: 0 2rem;
        }
      }
      .close-panel {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        height: 4rem;
        line-height: 4rem;
        border-top: 1px dashed #ccc;
        background: rgba(239, 239, 239,0.2);
        cursor: pointer;
        user-select: none;
        &:hover {
          background: rgba(239, 239, 239,0.7);
        }
      }
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
      .ivu-upload-drag {
        border: 1.5px dashed #009a61;
      }
    }
  }
  .fade-enter { opacity: 0;}
  .fade-enter-active { transition: all .5s;}
  .fade-leave-active { opacity: 0; transition: all .5s;}
}
</style>
<template>
  <div class="wang-editor">
    <Input v-model="editorTitle" placeholder="标题:用一句话来描述你的文章" />
    <div class="article-config">
      <div class="is-top">
        <span>是否置顶:</span>
        <i-switch v-model="setTop"/>
      </div>
      <Input
        v-model="editorTags"
        placeholder="请选择或输入想要添加的标签(用,号分隔)按回车添加"
        @on-focus="tagsPanelShow = true"
        @keyup.enter.native="addTagsHandle"
        >
          <span slot="prepend">
            <span v-for="(item,index) in chooseTagsList" :key="item">
              <Tag color="success" closable @on-close="removeTags(index)">{{item}}</Tag>
            </span>
          </span>
      </Input>
      <transition name="fade" mode="in-out">
        <div v-show="tagsPanelShow" class="tags-panel">
          <ul class="tags-list">
            <li
              class="tags-list-item"
              v-for="item in articleTags"
              :key="item.value">
              <Tag color="success" @click.native="choseTags(item)">{{item.label}}</Tag>
            </li>
          </ul>
          <p class="close-panel" @click="tagsPanelShow = false">收起</p>
        </div>
      </transition>
    </div>
    <div id="editorElem" ref="editorElem" style="text-align:left"></div>
    <p class="upload-label">上传一张图片作为封面大图吧~</p>
    <img-upload
      class="article-bg-upload"
      :fixed="true"
      :fixedNumber="[2,1]"
      :submitType="'articleBg'"
      @cropperSuccess="cropperSuccess">
      <div slot="upload-btn" style="padding: 20px 0; ">
          <Icon type="ios-cloud-upload" size="52" style="color: #009a61"></Icon>
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
import E from 'wangeditor'
import bus from '../common/bus.js'
import imgUpload from '@/pages/user/components/Img-upload-component'
export default {
  name: 'editor',
  components: { imgUpload },
  data () {
    return {
      spinshow: false, // 图片预览显示
      setTop: false, // 是否置顶
      tagsPanelShow: false, // tags面板是否显示
      chooseTagsList: [], // tags选择列表
      fileType: '', // 上传文件类型
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
    choseTags(item) {
      if (!this.chooseTagsList.includes(item.label)) {
        this.chooseTagsList.push(item.label);
      }
    },
    removeTags(index) {
      this.chooseTagsList.splice(index, 1);
    },
    // 手动添加标签
    addTagsHandle() {
      let result = this.editorTags.split(',');
      this.chooseTagsList = this.chooseTagsList.concat(result);
      this.editorTags = '';
    },
    closePanel() {
      this.tagsPanelShow = false;
    },
    validate() {
      if (!this.editorTitle) {
        this.$Message.error('请输入标题');
        return false;
      }
      else if (this.chooseTagsList.length === 0) {
        this.$Message.error('请为你的文章选择一个标签');
        return false;
      }
      else if (this.editorContent === '') {
        this.$Message.error('文章内容不能为空');
        return false;
      }
      else if (JSON.parse(localStorage.getItem('userData')).hasTopArticle && this.setTop) {
        this.$Message.error('已有置顶文章,请先修改置顶文章状态');
        return false;
      }
      return true;
    },
    articleConfirm() {
      if(!this.validate()) return;
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
        tags: this.chooseTagsList,
        title: this.editorTitle,
        content: this.editorContent,
        public_date: new Date()
      }
      debugger
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
