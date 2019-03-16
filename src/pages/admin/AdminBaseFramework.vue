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
      <Menu :theme="'dark'" active-name="1" :open-names="['3', '4', '5']">
        <MenuItem name="1">
          <router-link tag="li" to="/admin/overview">
            <Icon type="ios-paper" />
            概况看板
          </router-link>
        </MenuItem>
        <MenuItem name="2">
          <router-link tag="li" to="/admin/articleManage">
            <Icon type="ios-paper" />
            文章管理
          </router-link>
        </MenuItem>
        <MenuItem name="3">
          <router-link tag="li" to="/admin/userManage">
            <Icon type="ios-paper" />
            用户管理
          </router-link>
        </MenuItem>
        <MenuItem name="4">
          <router-link tag="li" to="/admin/tagManage">
            <Icon type="ios-paper" />
            用户管理
          </router-link>
        </MenuItem>
        <MenuItem name="5">
          <router-link tag="li" to="/admin">
            <Icon type="ios-paper" />
            数据统计
          </router-link>
        </MenuItem>
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
import { DEFAULT_AVATAR } from '@/constant/index.js';
export default {
  data () {
    return {
      adminId: '',
      adminDetails: {},
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getAdminInfo();
  },
  computed: {
    getAdminAvatar() {
      return this.adminDetails.avatar ? this.adminDetails.avatar : DEFAULT_AVATAR;
    }
  },
  methods: {
    getAdminInfo() {
      this.axios.get('/getAdminInfo', {
        params: {
          adminId: this.adminId,
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
