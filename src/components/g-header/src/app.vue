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
                <li
                  v-for="item in setDetails"
                  :key="item.value"
                  :value="item.value"
                >{{item.label}}</li>
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
                <li
                  v-for="item in msgDetails"
                  :key="item.value"
                  :value="item.value"
                >{{item.label}}</li>
              </ul>
            </div>
          </Poptip>
        </li>
        <li>
          <Poptip placement="bottom-end" v-model="userVisible">
              <Avatar class="header-avatar">U</Avatar>
              <div class="api" slot="title">
                {{username}}
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
    <Dropdown trigger="click" @on-click="itemClick($event)">
        <Button>
            创建
            <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem name="short">
              短文
            </DropdownItem>
            <DropdownItem name="long">
              <transition name="slide">
                <router-link tag="li" to="/write">长文</router-link>
              </transition>
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import bus from '@/common/bus.js';
import bg from '@/assets/images/WeUniv.png';
export default {
  name: 'g-header',
  data () {
    return {
      userVisible: false,
      mailVisible: false,
      settingVisible: false,
      username: '',
      userDetails: [
        { label: '我的主页', value: 'me' },
        { label: '我的喜欢', value: 'like' },
        { label: '我的收藏', value: 'collect' },
        { label: '个人设置', value: 'setting' },
        { label: '退出', value: 'exist' }
      ],
      msgDetails: [
        { label: '@我的', value: 'menitionMe' },
        { label: '私信', value: 'priMess' },
        { label: '赞', value: 'likeBy' },
        { label: '评论', value: 'comments' },
        { label: '广播通知', value: 'notice' }
      ],
      setDetails: [
        { label: '标签管理', value: 'tagManage' },
        { label: '关于', value: 'about' },
      ]
    }
  },
  created() {
    this.username = localStorage.getItem('username');
  },
  methods: {
    search () {
      alert('search');
    },
    detailOption(value) {
      if (value === 'exist') {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userid');
        localStorage.removeItem('userData');
        this.$router.push({ path: '/login' });
      }
      else if (value === 'me') {
        this.$router.push({ path: `/user/${localStorage.getItem('userid')}`});
      }
      else if (value === 'setting') {
        this.$router.push({ path: '/usersetting'});
      }
    },
    itemClick(name) {
      if(name === 'short') {
        bus.$emit('writeShortText');
      }
    }
  }
}
</script>
