export default {
  data() {
    return {

    }
  },
  methods: {
    // 获取关注状态
    getFollowStatus() {
      // 四种状态 互相关注 被关注 关注 无关系
      if(!this.userDetails.follow) return '关注';
      if (this.userDetails.follow.follower.includes(this.authorId) && this.userDetails.follow.following.includes(this.authorId)) {
        this.fllowShip = '互相关注';
      }
      else if (this.userDetails.follow.following.includes(this.authorId)) {
        this.fllowShip = '已关注';
      }
      else {
        // 被关注或无关系
        this.fllowShip = '关注';
      }
    },
    changFollowShip() {
      let Msg = ['互相关注', '已关注'].includes(this.fllowShip) ? '取消关注' : '关注';
      this.$Modal.confirm({
        title: '操作提示',
        content: `<p>是否确定${Msg}该用户？</p>`,
        onOk: () => {
          const api = Msg === '关注' ? '/addFllowShip' : '/removeFollowShip';
          this.axios.post(api, {
            userId: this.userDetails._id,
            followId: this.userAuthorDetails._id
          })
          .then(res => {
            this.$Notice.success({ title: '提示',  desc: '更新状态成功!' });
            this.getAuthorInfo();
            this.getUserInfo();
          })
          .catch(err => {
            console.log('err', err)
          })
        }
      });
    },
    // 获取当前页作者的信息 需要展示渲染页面
    getAuthorInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: this.authorId
        }
      })
      .then(res => {
        this.userAuthorDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        console.log('err', err)
      })
    },
    // 获取当前作者所有文章信息 用于当前页面渲染
    getArticleDetails() {
      this.axios.get('/getUserArticles', {
        params: {
          userid: this.authorId
        }
      })
      .then(res => {
        this.articleDetails = res.data.result;
        this.getUserInfo();
      })
      .catch(err => {
        console.log('err', err)
      })
    },
    // 获取更新登录用户的信息 用于传入子组件用来判断点赞 评论状态
    getUserInfo() {
      this.axios.get('/getUserDetails', {
        params: {
          id: localStorage.getItem('userid')
        }
      })
      .then(res => {
        this.userDetails = JSON.parse(JSON.stringify(res.data.result));
      })
      .catch(err => {
        console.log('err', err)
      })
      .finally( _=> {
        this.getFollowStatus();
      })
    },
  },
}
