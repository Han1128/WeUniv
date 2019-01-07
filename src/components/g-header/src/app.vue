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
        li{
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
    .header-right {
      float: right;
      ul {
        li {
          float: left;
          .header-icon {
            font-size: 25px;
            margin-right: 20px;
            cursor: pointer;
          }
          .header-avatar {
            margin-right: 20px;
            color: #f56a00;
            background-color: #fde3cf;
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
    <Input placeholder="Enter text" style="width: auto">
      <Icon type="ios-search" slot="suffix" @click="search"/>
    </Input>
    <div class="header-right">
      <ul>
        <li>
          <Icon type="ios-settings-outline" class="header-icon"/>
        </li>
        <li>
          <Icon
          type="ios-mail-outline"
          class="header-icon"
          v-show="!openMail"
          @click="openMail = !openMail" />
        </li>
        <li>
          <Icon
            type="ios-mail-open-outline"
            class="header-icon"
            style="margin-bottom: 7px"
            v-show="openMail"
            @click="openMail = !openMail"/>
        </li>
        <li>
          <Avatar class="header-avatar">U</Avatar>
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
      userName: '',
      openMail: false,
    }
  },
  methods: {
    search () {
      alert('search');
    }
  }
}
</script>
