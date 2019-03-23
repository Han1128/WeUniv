<style lang="less" scoped>
.user-setting {
  width: 100%;
  height: 100%;
  .setting-panel {
    width: 80%;
    margin: 0 auto;
    margin-top: 8rem;
    .panel-left {
      width: 28rem;
      height: 50rem;
      float: left;
      margin-right: 3rem;
      .ivu-card {
        height: 100%;
        border-radius: 1rem;
        border: 1px solid #d9d9d9;
        /deep/.ivu-card-body {
          padding: 0;
          .ivu-menu {
            width: 100% !important;
            z-index: 1;
          }
        }
      }
    }
    .panel-right {
      // height: 120rem;
      margin-left: 0;
      margin-bottom: 8rem;
      overflow: hidden;
      border-radius: 1rem;
    }
  }
}
</style>
<template>
  <div class="user-setting">
    <g-header></g-header>
    <div class="setting-panel">
      <div class="panel-left">
        <Card :bordered="false">
          <p slot="title">Borderless card</p>
          <Menu :active-name="activeItem" @on-select="menuItemSelect">
            <MenuItem name="generalSet">
                <Icon type="md-document" />
                常规修改
            </MenuItem>
            <MenuItem name="schoolInfoSet">
                <Icon type="md-chatbubbles" />
                在校信息
            </MenuItem>
            <MenuItem name="securitySet">
                <Icon type="md-chatbubbles" />
                安全设置
            </MenuItem>
          </Menu>
        </Card>
      </div>
      <div class="panel-right">
        <general-set :settingType="activeItem"></general-set>
      </div>
    </div>
  </div>
</template>
<script>
import generalSet from './components/setting/general-set';
export default {
  name: 'userSetting',
  components: { generalSet },
  data () {
    return {
      activeItem: "generalSet",
    }
  },
  created() {
    if (this.$route.params.type) {
      this.activeItem = this.$route.params.type;
    }
  },
  methods: {
    menuItemSelect(name) {
      this.activeItem = name;
    }
  }
}
</script>
