<style lang="less" scoped>
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
          <Poptip placement="bottom" v-model="settingVisible" width="100">
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
              style="margin-bottom: .7rem"
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
                  <li
                    v-for="item in userDetails"
                    :key="item.value"
                    :value="item.value"
                    @click="detailOption(item.value)"
                  >{{item.label}}</li>
                </ul>
              </div>
          </Poptip>
        </li>
      </ul>
    </div>
    <Dropdown trigger="click" @on-click="goToArticle($event)">
        <Button>
            创建
            <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem name="short">短文</DropdownItem>
            <DropdownItem name="long">长文</DropdownItem>
        </DropdownMenu>
    </Dropdown>
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
      settingVisible: false,
      userDetails: [
        { label: '我的喜欢', value: 'like' },
        { label: '我的收藏', value: 'collect' },
        { label: '我的主页', value: 'main' },
        { label: '个人设置', value: 'setting' },
        { label: '退出', value: 'exist' }
      ],
      msgDetails: {

      },
      setDetails: {

      }
    }
  },
  methods: {
    search () {
      alert('search');
    },
    detailOption(value) {
      if (value === 'exist') {
        localStorage.removeItem('token');
        this.$router.push({ path: '/login' })
      }
    },
    goToArticle(name) {
      if (name === 'long') {
        this.$router.push({
          path: '/write'
        })
      }
    }
  }
}
</script>
