<style lang="less" scoped>
.article-write {
  height: 100%;
  .writing-header {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    border-top: 0.3rem solid #009a61;
    box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.3), 0 0 0.6rem 0.3rem rgba(0, 0, 0, 0.15);
    background: #fafafa;
    /deep/.ivu-btn {
      font-size: 1.4rem;
      color: #fff;
      background: #009a61;
    }
    .btn-right {
      float: right;
    }
  }
}
</style>
<template>
  <div class="article-write" :style="changeTheme">
    <div class="writing-header" :style="{'background': editorSetting.theme ? darkColor : 'none'}">
      <Button @click="goBack">返回首页</Button>
      <span class="btn-right">
        <Button @click="submitForm">发布文章</Button>
        <Button icon="md-settings" @click="showDrawer=true">编辑设置</Button>
      </span>
    </div>
    <Drawer title="编辑器设置" placement="left" :closable="false" v-model="showDrawer">
        <Form :model="editorSetting" :label-width="70">
          <FormItem label="主题切换">
              <i-switch v-model="editorSetting.theme">
                  <span slot="open">暗黑模式</span>
                  <span slot="close">明亮模式</span>
              </i-switch>
          </FormItem>
          <FormItem label="背景切换">
              <Select v-model="editorSetting.bgColor" style="width:100px">
                  <Option v-for="item in editorBgColor" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
          <FormItem label="模式切换">
              <RadioGroup v-model="editorSetting.model">
                  <Radio label="write">写作模式</Radio>
                  <Radio label="preview">预览模式</Radio>
              </RadioGroup>
          </FormItem>
          <FormItem label="图片比例">
              <Select v-model="editorSetting.imgSize" style="width:100px">
                  <Option v-for="item in imgSizeChoose" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
          </FormItem>
      </Form>
    </Drawer>
    <div class="edit-content">
      <!-- <quill-editor ref="quillEditor" @turnPage="turnPage"></quill-editor> -->
      <!-- <tiny-editor ref="tinyEditor" ></tiny-editor> -->
      <wang-editor ref="wangEditor"
        :fixedNumber="editorSetting.imgSize"
        :editorTheme="editorSetting.theme"
        :model="editorSetting.model"
        @turnPage="turnPage">
      </wang-editor>
    </div>
  </div>
</template>
<script>
import bus from './common/bus.js'
import quillEditor from './components/quill-editor'
import tinyEditor from './components/tiny-editor'
import wangEditor from './components/wang-editor'
import mixins from './common/mixins.js'
export default {
  mixins: [mixins],
  components: { quillEditor, tinyEditor, wangEditor },
  data () {
    return {
      currentEditor: 'wangEditor', // 当前编辑器
      showDrawer: false,
      isSave: false,
      darkColor: '#1F2223',
      editorSetting: {
        theme: false,
        model: 'write',
        imgSize: '2:1',
        bgColor: 'none'
      },
      editorBgColor: [{
        label: '默认',
        value: 'none'
      }, {
        label: '暖色',
        value: 'antiquewhite'
      }, {
        label: '浅蓝',
        value: 'aliceblue'
      }, {
        label: '护眼',
        value: 'beige'
      }, {
        label: '咖啡',
        value: 'tan'
      }],
      imgSizeChoose: [{
        label: '3:2',
        value: '3:2'
      }, {
        label: '2:1',
        value: '2:1'
      }, {
        label: '4:3',
        value: '4:3'
      }]
    }
  },
  watch: {

  },
  computed: {
    changeTheme() {
      return {
        'background': this.editorSetting.theme ? this.darkColor : this.editorSetting.bgColor,
        'color': this.editorSetting.theme ? '#fff': 'black'
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSave) {
      const request = window.confirm('Do you really want to leave? you have unsaved changes!');
      if (request) {
        next();
      }
      else {
        next(false);
      }
    }
    else {
      next();
    }
  },
  methods: {
    turnPage(articleid) {
      this.isSave = true;
      this.getUserInfo(); //更新localStore
      this.$router.push({ path: `/view/${articleid}`});
    },
    submitForm() {
      // this.$refs.quillEdit.articleConfirm();
      this.$refs[this.currentEditor].articleConfirm();
    },
    goBack() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
