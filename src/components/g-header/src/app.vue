<style lang="less" scoped>
</style>
<template>
  <div class="g-header">
    <a href="/" class="logo"></a>
    <div class="header-left">
      <ul class="menu">
        <li>
          <transition name="slide">
            <router-link tag="a" to="/">首页</router-link>
          </transition>
        </li>
        <li>
          <transition name="slide">
            <router-link tag="a" to="/home/follow">关注</router-link>
          </transition>
        </li>
      </ul>
    </div>
    <i-input v-model="searchContent" class="header-search__input" placeholder="搜索用户或关键词">
      <Icon type="ios-search" slot="suffix" @click="search"/>
    </i-input>
    <div class="header-right">
      <ul class="icon-list">
        <li>
          <Poptip placement="bottom" v-model="settingVisible" width="100">
            <Icon type="ios-settings-outline" class="icon-style"/>
            <div slot="content">
              <ul class="list-details">
                <transition name="slide">
                  <router-link tag="li" to="/usersetting">个人设置</router-link>
                </transition>
                <transition name="slide">
                  <router-link tag="li" to="/home/tag">标签管理</router-link>
                </transition>
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
                <transition name="slide">
                    <router-link tag="li" to="/message/unReadMsg">
                      未读通知<span class="unread-msg">3</span>
                    </router-link>
                  </transition>
                <transition name="slide">
                  <router-link tag="li" :to="'/message/likeArticle'">收到点赞</router-link>
                </transition>
                <transition name="slide">
                  <router-link tag="li" to="/message/comment">收到评论</router-link>
                </transition>
                <transition name="slide">
                  <router-link tag="li" to="/message/collect">收到收藏</router-link>
                </transition>
              </ul>
            </div>
          </Poptip>
        </li>
        <li>
          <Poptip placement="bottom-end" v-model="userVisible">
              <Avatar
                class="header-avatar"
                :src="getAvatar">
              </Avatar>
              <div class="api" slot="title">
                {{userDetails.username}}
              </div>
              <div slot="content">
                <ul class="list-details">
                  <transition name="slide">
                    <router-link tag="li" :to="'/user/' + userId">我的主页</router-link>
                  </transition>
                  <transition name="slide">
                    <router-link tag="li" :to="'/user/' + userId + '/search/likeArticle'">我的喜欢</router-link>
                  </transition>
                  <transition name="slide">
                    <router-link tag="li" :to="'/user/' + userId + '/search/collect'">我的收藏</router-link>
                  </transition>
                  <transition name="slide">
                    <router-link tag="li" :to="'/user/' + userId + '/search/comment'">我的评论</router-link>
                  </transition>
                  <li @click="exit()">退出</li>
                </ul>
              </div>
          </Poptip>
        </li>
      </ul>
    </div>
    <Dropdown trigger="click" @on-click="showShortText($event)">
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
import { DEFAULT_AVATAR } from '@/constant/index.js';
import bg from '@/assets/images/WeUniv.png';
export default {
  name: 'g-header',
  data () {
    return {
      userVisible: false, // 点击用户头像
      mailVisible: false, // 点击邮件
      settingVisible: false, // 点击设置
      searchContent: '', // 搜索内容
      userId: '',
      userDetails: [],
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getUserInfo();
  },
  computed: {
    getAvatar() {
      return this.userDetails.avatar ? this.userDetails.avatar : DEFAULT_AVATAR;
    }
  },
  methods: {
    search () {
      if(!this.searchContent) {
        this.$Message.error('请输入搜索内容');
      }
      this.$router.push({ path: `/search/${this.searchContent}` });
    },
    // 获取用户信息
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.userId
        }
      })
      .then(res => {
        localStorage.setItem('userData', JSON.stringify(res.data.result));
        this.userDetails = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    exit() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userid');
      localStorage.removeItem('userData');
      this.$router.push({ path: '/login' });
    },
    showShortText(name) {
      if(name === 'short') {
        bus.$emit('writeShortText');
      }
    }
  }
}
</script>
