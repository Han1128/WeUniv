<style lang="less" scoped>
.admin-base-framework {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .admin-header {
    width: 100%;
    height: 5rem;
    position: fixed;
    top: 0;
    z-index: 100;
    background: #2d8cf0;
    .header-left {
      float: left;
      font-family: -webkit-pictograph;
      font-size: 2.8rem;
      line-height: 5rem;
      margin-left: 5rem;
      color: #fff;
    }
    .header-right {
      float: right;
      line-height: 5rem;
      margin-right: 5rem;
      margin-top: .2rem;
      color: #fff;
      font-size: 1.5rem;
    }
  }
  .admin-sidebar {
    width: 24rem;
    height: 100%;
    position: fixed;
    top: 5rem;
    background: #304156;
    .admin-info {
      .avatar {
        float: left;
        width: 5rem;
        border-radius: 5rem;
      }
      .admin-name {
        margin-top: .5rem;
        margin-left: 6rem;
        font-size: 1.6rem;
        color: #fff;
        font-family: sans-serif;
      }
      .admin-online {
        margin-left: 6rem;
        /deep/.ivu-badge-status-text {
          color: #fff;
          font-weight: bold;
        }
      }
    }
    .ivu-menu-dark {
      background: transparent;
    }
  }
  .admin-container {
    height: 100%;
    margin-top: 5rem;
    margin-left: 24rem;
    background: #F0F2F5;
  }
}
</style>
<template>
  <div class="admin-base-framework">
    <div class="admin-header">
      <div class="header-left">
        <span><b>WE</b>Unniv</span>
      </div>
      <div class="header-right">
          <!-- <span>欢迎你</span> -->
          <Dropdown>
              <!-- <img class="avatar" :src="getAdminAvatar" /> -->
              <span>欢迎你 {{adminDetails.username}}</span>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <router-link tag="li" to="/">返回首页</router-link>
                </DropdownItem>
                <DropdownItem>注销</DropdownItem>
                <DropdownItem>退出</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          <!-- <img class="avatar" :src="getAdminAvatar" /> -->

      </div>
    </div>
    <aside class="admin-sidebar">
      <Menu :theme="'dark'" :active-name="selectIndex" @on-select="selectItem">
        <MenuItem class="admin-info" name="0">
          <img class="avatar" :src="getAdminAvatar" />
          <p class="admin-name">{{adminDetails.username}}</p>
          <p class="admin-online"><Badge status="success" text="Online"/></p>
        </MenuItem>
        <MenuItem name="1">
          <router-link tag="li" to="/admin/overview">
            <Icon type="ios-color-palette" />
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
            <Icon type="md-person" />
            用户管理
          </router-link>
        </MenuItem>
        <MenuItem name="4">
          <router-link tag="li" to="/admin/tagManage">
            <Icon type="md-pricetags" />
            话题管理
          </router-link>
        </MenuItem>
        <MenuItem name="5">
          <router-link tag="li" to="/admin/commentManage">
            <Icon type="md-text" />
            评论管理
          </router-link>
        </MenuItem>
        <MenuItem name="6">
          <router-link tag="li" to="/admin/statistics">
            <Icon type="md-stats" />
            数据统计
          </router-link>
        </MenuItem>
      </Menu>
    </aside>
    <div class="admin-container">
      <router-view></router-view>
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
      selectIndex: '1'
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
    selectIndex(index) {
      this.selectIndex = index;
    },
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
