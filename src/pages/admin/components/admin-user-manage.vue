<style lang="less" scoped>
.admin-article-manage {
  padding-top: 3rem;
  margin: 0 3rem;
  /deep/.ivu-table {
    width: 100%;
    /deep/td {
      text-align: center;
    }
  }
  /deep/.ivu-page {
    text-align: center;
    padding: 4rem 0;
    padding-top: 3rem;
  }
}
</style>
<template>
  <div class="admin-article-manage">
    <Button type="success" icon="md-add" @click="addModal = true" style="margin-bottom: 2rem">添加用户</Button>
    <i-table size="large" border :columns="userMap" :data="userData">
      <template slot-scope="{ row, index }" slot="index">
          <strong>{{ (currentPage - 1)* 10 + index + 1 }}</strong>
      </template>
      <!-- 状态 -->
      <template slot-scope="{ row }" slot="status">
        <Tag color="success" v-if="row.status">有效</Tag>
        <Tag color="error" v-else>无效</Tag>
      </template>
      <!-- 标签 -->
      <template slot-scope="{ row }" slot="tag">
        <Tag
          color="primary"
          v-for="(item, index) in row.hobby_tags"
          :key="index">
          {{ item }}
        </Tag>
      </template>
      <template slot-scope="{ row }" slot="article">
        <strong>{{row.article.length}}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
          <i-button type="primary" size="small" @click="showDetails(index, 'detailsModal')">详情</i-button>
          <i-button type="success" size="small" @click="showDetails(index, 'modifyModal')">修改</i-button>
          <i-button
            v-show="!recommendList.recommendUser.includes(row._id)"
            type="error"
            size="small"
            @click="setRecommend(index)">
            设为推荐
          </i-button>
      </template>
    </i-table>
    <Page :total="totalNums" :current.sync="currentPage" show-elevator @on-change="getUserData"/>

    <!-- 用户无邮件添加 -->
    <Modal
      title="用户添加"
      v-model="addModal"
      :mask-closable="false">
      <adminUser-add ref="addUser" @success="getUserData"></adminUser-add>
      <div slot="footer">
        <Button @click="adminAddUser" type="info">提交</Button>
      </div>
    </Modal>
    <Modal
      title="详细信息"
      v-model="detailsModal"
      :mask-closable="false"
      @on-ok="detailsModal = false"
      @on-cancel="detailsModal = false">
      <user-details :userDetails="userData[editIndex]"></user-details>
    </Modal>
    <Modal
      title="私密信息修改"
      v-model="modifyModal"
      :mask-closable="false"
      @on-ok="confirm"
      @on-cancel="modifyModal = false">
      <admin-user-modify ref="userModify" :userDetails="userData[editIndex]" @success="getUserData"></admin-user-modify>
    </Modal>
  </div>
</template>
<script>
import { USER_MAP } from '../common/index.js'
import UserDetails from './details/user-details';
import AdminUserModify from './details/admin-user-modify';
import AdminUserAdd from './details/admin-user-add';
export default {
  components: {UserDetails, AdminUserModify, AdminUserAdd},
  data () {
    return {
      adminId: '',
      userMap: USER_MAP,
      userData: [],
      recommendList: {},
      currentPage: 1,
      totalNums: 0,
      addModal: false,
      detailsModal: false,
      modifyModal: false,
      editIndex: -1
    }
  },
  created() {
    this.adminId = localStorage.getItem('userid');
    this.getUserData();
  },
  methods: {
    confirm() {
      this.$refs.userModify.confirm()
    },
    adminAddUser() {
      this.$refs.addUser.handleSubmit();
    },
    getUserData() {
      this.axios.get('/getAdminMenuList', {
        params: {
          adminId: this.adminId,
          type: 'user',
          pageNum: this.currentPage - 1
        }
      })
      .then(res => {
        this.recommendList = res.data.recommendList;
        this.userData = res.data.result;
        this.totalNums = res.data.count;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
      .finally(_ => {
        this.addModal = false;
        this.detailsModal = false;
        this.modifyModal = false;
      })
    },
    showDetails(index, modal) {
      this.editIndex = index;
      this[modal] = true;
    },
    setRecommend (index) {
      this.$Modal.confirm({
        title: '操作提示',
        content: `<p>新增推荐用户将替代旧推荐用户,是否确认修改？</p>`,
        onOk: () => {
          this.axios.post('/addToRecommendUser', {
            adminId: this.adminId,
            userId: this.userData[index]._id
          })
          .then(res => {
            this.$Notice.success({ title: '提示',  desc: '设置成功!' });
            this.getUserData();
          })
          .catch(err => {
            this.$Notice.error({ title: '提示',  desc: err.message });
          })
        }
      });
    }
  }
}
</script>
