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
  .uplload-list {
    display: inline-block;
    position: relative;
    font-size: 0;
    img {
      max-width: 30rem;
    }
    .background-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
      .ivn-icon {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
      }
    }
    &:hover {
      .background-cover {
        display: block;
        .ivu-icon {
          font-size: 3.5rem;
          color: #fff;
          cursor: pointer;
          user-select: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
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
        <i-switch v-model="isTop" @on-change="setArticleTop"/>
      </div>
      <i-input
        v-model="editorTags"
        placeholder="请选择或输入想要添加的标签(用,号分隔)按回车添加"
        @on-focus="tagsPanelShow = true"
        @keyup.enter.native="addTagsHandle">
          <span slot="prepend">
            <span v-for="(item,index) in chooseTagsList" :key="item">
              <Tag color="success" closable @on-close="removeTags(index)">{{item}}</Tag>
            </span>
          </span>
      </i-input>
      <transition name="fade" mode="in-out">
        <div v-show="tagsPanelShow" class="tags-panel">
          <ul class="tags-list">
            <li
              class="tags-list-item"
              v-for="item in tagsList"
              :key="item.iconCode">
              <Tag :color="randomColor()" @click.native="chooseTags(item.iconLabel)">{{item.iconLabel}}</Tag>
            </li>
          </ul>
          <p class="close-panel" @click="tagsPanelShow = false">收起</p>
        </div>
      </transition>
    </div>
    <div id="editorElem" ref="editorElem" style="text-align:left"></div>
    <p class="upload-label">上传一张图片作为封面大图吧~</p>
    <div class="uplload-list" v-if="articleCoverBg">
      <img :src="articleCoverBg" />
      <div class="background-cover">
        <Icon type="ios-trash-outline" @click.native="removeImg"></Icon>
      </div>
    </div>
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
  props: {
    articleDetailContent: {
      type: Object
    }
  },
  data () {
    return {
      editor: {},
      topId: '', // 置顶文章id
      spinshow: false, // 图片预览显示
      isTop: false, // 是否置顶
      tagsPanelShow: false, // tags面板是否显示
      chooseTagsList: [], // tags选择列表
      fileType: '', // 上传文件类型
      editorTitle: '',
      editorContent: '',
      articleCoverBg: '',
      editorTags: '',
      tagsList: [],

    }
  },
  created() {
    this.topId = JSON.parse(localStorage.getItem('userData')).topArticle;
    this.getAllTags();
  },
  mounted() {
    var editor = new E('#editorElem')
    this.editor = editor;
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    this.editor.customConfig.pasteFilterStyle = false // 关闭掉粘贴样式的过滤
    this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
    this.editor.create();
  },
  computed: {
    getArticleText() {
      return this.editor.txt.text();
    }
  },
  watch: {
    articleDetailContent: {
      immediate: true, // 如果没有这句在created的时候不会执行
      handler (val) {
        if (val._id) {
          this.editor.txt.html(val.content);
          this.editorTitle = val.title;
          this.articleCoverBg = val.coverBg[0];
          this.chooseTagsList = val.tag;
          this.isTop = val.isTop;
        }
      }
    }
  },
  methods: {
    // 获取全部标签
    getAllTags() {
      this.axios.get('/getAllTags', {})
      .then(res => {
        this.tagsList = res.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    setArticleTop(status) {
      if (this.topId && status === true) {
        this.$Modal.confirm({
          title: '操作提示',
          content: `<p>您已有置顶文章,是否提交后替换该文章?</p>`,
          onOk: () => {
            this.isTop = true;
          },
          onCancel: () => {
            this.isTop = false;
          }
        });
      }
    },
    randomColor() {
      const colorList = ['primary', 'success', 'purple', 'error', 'warning'];
      let index = Math.floor((Math.random() * colorList.length));
      return colorList[index];
    },
    removeImg() {
      this.articleCoverBg = '';
    },
    cropperSuccess(result) {
      this.articleCoverBg = result;
    },
    chooseTags(item) {
      if (this.chooseTagsList.length === 5) {
        this.$Message.error('最多只能添加5个标签~');
        return;
      }
      else if (!this.chooseTagsList.includes(item)) {
        this.tagsPanelShow = false;
        this.chooseTagsList.push(item);
      }
    },
    removeTags(index) {
      this.chooseTagsList.splice(index, 1);
    },
    // 手动添加标签
    addTagsHandle() {
      if (this.chooseTagsList.length === 5) {
        this.$Message.error('最多只能添加5个标签~');
        return;
      }
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
      else if (this.editorContent === '' && this.editor.txt.html() === '') {
        this.$Message.error('文章内容不能为空');
        return false;
      }
      // else if (JSON.parse(localStorage.getItem('userData')).hasTopArticle && this.isTop) {
      //   this.$Message.error('已有置顶文章,请先修改置顶文章状态');
      //   return false;
      // }
      return true;
    },
    articleConfirm() {
      if(!this.validate()) return;
      // 校验
      this.spinshow = true;
      const userid = localStorage.getItem('userid');
      const username = localStorage.getItem('username');
      const data = {
        userId: userid,
        username,
        type: 'long',
        viewsTime: 0,
        isTop: this.isTop, //是否设置置顶
        topId: this.topId, // 置顶文章id
        coverBg: this.articleCoverBg,
        tags: this.chooseTagsList,
        title: this.editorTitle,
        content: this.editorContent,
        text: this.editor.txt.text().replace(/&nbsp;/ig, ""),
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
    },
    articleEdit() {
      if(!this.validate()) return;
      // 校验
      this.spinshow = true;
      const userid = localStorage.getItem('userid');
      const username = localStorage.getItem('username');
      const data = {
        userId: userid,
        username,
        articleId: this.$route.params.articleId,
        isTop: this.isTop, // 是否置顶
        topId: this.topId, // 置顶文章id
        coverBg: this.articleCoverBg,
        tags: this.chooseTagsList,
        title: this.editorTitle,
        content: this.editor.txt.html(),
        text: this.editor.txt.text().replace(/&nbsp;/ig, ""),
        viewsTime: 1,
        update_time: new Date()
      }
      this.axios.post('/articleEdit', data)
      .then(res => {
        this.$Message.success('文章提交成功');
        this.$emit('turnPage', this.$route.params.articleId);
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
