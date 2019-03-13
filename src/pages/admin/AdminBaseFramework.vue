<style lang="less" scoped>
.admin-base-framework {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .admin-sidebar {
    width: 24rem;
    height: 100%;
    float: left;
    position: fixed;
    background: #363E4F;
  }
  .admin-body {
    .admin-header {
      width: auto;
      height: 5rem;
      margin-left: 24rem;
      background: #304156;
      .header-right {
        float: right;
        margin-right: 3rem;
        margin-top: .2rem;
        color: #fff;
        font-size: 1.5rem;
        .avatar {
          width: 4rem;
          border-radius: 4rem;
          vertical-align: middle;
        }
      }
    }
    .admin-container {
      height: 100%;
      margin-left: 24rem;
    }
  }
}
</style>
<template>
  <div class="admin-base-framework">

    <div class="admin-sidebar">
      <Menu :theme="'dark'" active-name="1" :open-names="['2', '3', '4', '5']">
        <MenuItem name="1">
          <router-link tag="li" to="admin/overview">
            <Icon type="ios-paper" />
            概况看板
          </router-link>
        </MenuItem>
          <Submenu name="2">
              <template slot="title">
                  <Icon type="ios-paper" />
                  文章管理
              </template>
              <MenuItem name="2-1">文章管理</MenuItem>
              <MenuItem name="2-2">评论管理</MenuItem>
          </Submenu>
          <Submenu name="3">
              <template slot="title">
                  <Icon type="ios-paper" />
                  标签管理
              </template>
              <MenuItem name="3-1">文章管理</MenuItem>
              <MenuItem name="3-2">评论管理</MenuItem>
          </Submenu>
          <Submenu name="4">
              <template slot="title">
                  <Icon type="ios-people" />
                  用户管理
              </template>
              <MenuItem name="4-1">新增用户</MenuItem>
              <MenuItem name="4-2">编辑用户</MenuItem>
              <MenuItem name="4-3">用户反馈</MenuItem>
          </Submenu>
          <Submenu name="5">
              <template slot="title">
                  <Icon type="ios-stats" />
                  统计分析
              </template>
              <MenuItem name="5-1">新增和启动</MenuItem>
              <MenuItem name="5-2">活跃分析</MenuItem>
              <MenuItem name="5-3">时段分析</MenuItem>
          </Submenu>
      </Menu>
    </div>
    <div class="admin-body">
      <div class="admin-header">
        <div class="header-right">
            <!-- <span>欢迎你</span> -->
            <Dropdown>
                <img class="avatar" :src="getAdminAvatar" />
                <DropdownMenu slot="list">
                  <DropdownItem>
                    <router-link tag="li" to="/">返回首页</router-link>
                  </DropdownItem>
                  <DropdownItem>注销</DropdownItem>
                  <DropdownItem>退出</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <!-- <img class="avatar" :src="getAdminAvatar" /> -->
            <span>{{adminDetails.username}}</span>
        </div>
      </div>
      <div class="admin-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      adminId: '',
      adminDetails: {}
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getAdminInfo();
  },
  computed: {
    getAdminAvatar() {
      return this.adminDetails.avatar ? this.adminDetails.avatar : 'https://i.loli.net/2017/08/21/599a521472424.jpg';
    }
  },
  methods: {
    getAdminInfo() {
      this.axios.get('/getAdminInfo', {
        params: {
          adminId: this.adminId
        }
      })
      .then(res => {
        this.adminDetails = res.data.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: '用户未授权' });
      })
    }
  }
}
</script>
