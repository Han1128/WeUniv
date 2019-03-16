<style lang="less" scoped>
.user-tags-manage {
  width: 60%;
  margin: 0 auto;
  .tags-content {
    margin-top: 5rem;
    padding-top: 4rem;
    .tags-body {
      padding-left: 4rem;
      overflow: hidden;
      .topic-item {
        width: 20rem;
        height: 10rem;
        float: left;
        margin: 1rem 2rem;
        text-align: center;
        .item-right {
          float: right;
          .label {
            font-size: 1.8rem;
            font-weight: bold;
          }
          .follower {
            font-size: 1.4rem;
          }
          .btn-list {

          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="user-tags-manage">
    <g-header></g-header>
    <div class="tags-content">
      <h2 class="title">全部标签</h2>
      <Divider />
      <div class="tags-body">
        <ul>
          <li
          class="topic-item"
          v-for="(item, index) in tagsList"
          :key="index"
          @click="filtrerByTag(item.iconLabel)">
            <svg class="icon-large icon-style" aria-hidden="true">
                <use :xlink:href="'#'+item.iconCode"></use>
            </svg>
            <div class="item-right">
              <p class="label">{{item.iconLabel}}</p>
              <p class="follower">{{item.follower_num}}关注</p>
              <p class="btn-list">
                <Button
                  v-if="item.follower.includes(userId)"
                  icon="ios-checkmark"
                  @click="removeFollowTag(item.iconLabel)">已关注</Button>
                <Button
                  v-else
                  icon="ios-add"
                  @click="addFollowTag(item.iconLabel)">关注</Button>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userId: '',
      tagsList: []
    }
  },
  created() {
    this.userId = localStorage.getItem('userid');
    this.getAllTags();
  },
  methods: {
    // 获取全部标签
    getAllTags() {
      this.axios.get('/getAllTags', {})
      .then(res => {
        this.tagsList = res.result;
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    addFollowTag(label) {
      this.axios.post('/addFollowTag', {
        userId: this.userId,
        label: label
      })
      .then(res => {
        this.$Notice.success({ title: '提示',  desc: res.message });
        this.getAllTags();
      })
      .catch(err => {
        this.$Notice.error({ title: '提示',  desc: err.message });
      })
    },
    removeFollowTag(label) {
      debugger
      // this.axios.post('/removeFollowTag', {
      //   userId: this.userId,
      //   label: label
      // })
      // .then(res => {
      //   this.$Notice.success({ title: '提示',  desc: err.message });
      //   this.getAllTags();
      // })
      // .catch(err => {
      //   this.$Notice.error({ title: '提示',  desc: err.message });
      // })
    }
  }
}
</script>
