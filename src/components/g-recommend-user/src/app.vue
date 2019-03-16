<style lang="less" scoped>
.g-recommend-user {
  .recommend-user {
    li {
      overflow: hidden;
      padding: 1rem;
      img {
        width: 4rem;
        float: left;
        margin-left: .5rem;
        border-radius: 5rem;
      }
      .recommend-user-details {
        margin-left: 6rem;
      }
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
<template>
  <div class="g-recommend-user">
    <ul class="recommend-user">
      <li v-for="item in recommendUser" :key="item._id">
        <img :src="item.avatar || defaultAvatar">
        <div class="recommend-user-details">
          <p>
            <span>{{item.username}}</span>
            <span>
              {{item.userType === 'student' ? '学生' : item.userType === 'teacher' ? '教师' : '机构'}}
            </span>
          </p>
          <p>已经写下{{item.article.length}}篇文章</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { DEFAULT_AVATAR } from '@/constant/index.js';
export default {
  name: 'g-recommend-user',
  props: {
    recommendUser: {
      type: Array,
      default: _ => []
    }
  },
  data () {
    return {
      defaultAvatar: DEFAULT_AVATAR
    }
  },
}
</script>
