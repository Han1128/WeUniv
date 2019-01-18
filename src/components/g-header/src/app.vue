<style lang="less" scoped>
  .g-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fafafa;
    border-top: 3px solid #009a61;
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.3), 0 0 6px 2px rgba(0,0,0,0.15);
    z-index: 100;
    .logo {
        display: block;
        float: left;
        width: 100px;
        height: 100%;
        margin: 7px 30px;
        background: url(~assets/images/WeUniv.png) no-repeat;
        background-size: 100%;
    }
    .header-left {
      float: left;
      height: 100%;
      .menu {
        height: 100%;
        margin: 0 10px;
        > li{
          float: left;
          padding: 0 20px;
          a {
            color: #333;
          }
          &:hover {
            background: #d4d4d4;
          }
        }
      }
    }
    .header-search__input {
        width: 250px;
        line-height: 46px;
        float: left;
        margin-left: 20px;
        /deep/.ivu-input {
          font-size: 13px;
        }
    }
    .header-right {
      float: right;
      .icon-list {
        > li {
          float: left;
          .icon-style {
            font-size: 25px;
            margin-right: 20px;
            cursor: pointer;
          }
          .header-avatar {
            margin-right: 20px;
            cursor: pointer;
            color: #f56a00;
            background-color: #fde3cf;
          }
          /deep/.ivu-poptip-body {
            padding: 0;
            .list-details {
              font-size: 14px;
              padding: 5px 0;
              > li {
                padding: 5px 0;
                cursor: pointer;
                &:hover {
                  background: #f2f2f5;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<template>
  <div class="g-header">
    <a href="/" class="logo"></a>
    <div class="header-left">
      <ul class="menu">
        <li><a href="/">首页</a></li>
        <li> <a href="/">关注</a></li>
        <li><a href="/">推荐</a></li>
      </ul>
    </div>
    <Input class="header-search__input" placeholder="Enter text">
      <Icon type="ios-search" slot="suffix" @click="search"/>
    </Input>
    <div class="header-right">
      <ul class="icon-list">
        <li>
          <Poptip placement="bottom" v-model="settingVisible">
            <Icon type="ios-settings-outline" class="icon-style"/>
            <div slot="content">
              <ul class="list-details">
                <li>标签管理</li>
                <li>我的设置</li>
                <li>关于</li>
              </ul>
            </div>
          </Poptip>
        </li>
        <li>
          <Poptip placement="bottom" v-model="mailVisible">
            <Icon
            type="ios-mail-outline"
            class="icon-style"
            v-show="!mailVisible"
            @click="mailVisible = !mailVisible"/>
            <Icon
              type="ios-mail-open-outline"
              class="icon-style"
              style="margin-bottom: 7px"
              v-show="mailVisible"
              @click="mailVisible = !mailVisible"/>
            <div slot="content">
              <ul class="list-details">
                <li>@我的</li>
                <li>私信</li>
                <li>赞</li>
                <li>评论</li>
                <li>广播通知</li>
              </ul>
            </div>
          </Poptip>
        </li>
        <li>
          <Poptip placement="bottom-end" v-model="userVisible">
              <Avatar class="header-avatar">U</Avatar>
              <div class="api" slot="title">
                Title
              </div>
              <div slot="content">
                <ul class="list-details">
                  <li>我的喜欢</li>
                  <li>我的收藏</li>
                  <li>我的主页</li>
                  <li>个人设置</li>
                  <li>退出</li>
                </ul>
              </div>
          </Poptip>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import bg from '@/assets/images/WeUniv.png';
export default {
  name: 'g-header',
  data () {
    return {
      userVisible: false,
      mailVisible: false,
      settingVisible: false
    }
  },
  methods: {
    search () {
      alert('search');
    }
  }
}
</script>
