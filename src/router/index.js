import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router =  new Router({
  mode: 'history', // 使url中没有hash#号,默认的是hash模式
  base: '/WeUniv/', // base作用就是访问时,以它开头的路径,这个base不是强制性的
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录页',

      },
      component: (resolve) => {
        require(['@/pages/account/Login'], resolve);
      }
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '注册页'
      },
      component: (resolve) => {
        require(['@/pages/account/Register'], resolve);
      }
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        title: '错误页'
      },
      component: (resolve) => {
        require(['@/pages/error/error'], resolve);
      }
    },
    {
      path: '/home',
      name: 'BaseHomeFramework',
      meta: {
        title: '首页',
        requiresAuth: true
      },
      component: (resolve) => {
        require(['@/pages/home/BaseHomeFramework'], resolve);
      }
    },
    {
      path: '/message/:action',
      name: 'messageDetails',
      meta: {
        title: '消息页',
        requiresAuth: true
      },
      component: (resolve) => {
        require(['@/pages/user/components/user-message-details'], resolve);
      }
    },
    {
      path: '/user/:userid',
      name: 'userPage',
      redirect: '/user/:userid/home',
      meta: {
        title: '用户页',
        requiresAuth: true
      },
      component: (resolve) => {
        require(['@/pages/user/userPage'], resolve);
      },
      children: [{
        path: 'home',
        meta: {
          requiresAuth: true // 不要忘了这句
        },
        component: (resolve) => {
          require(['@/pages/user/components/user-article-details'], resolve);
        }
      }, {
        path: ':search',
        meta: {
          requiresAuth: true
        },
        component: (resolve) => {
          require(['@/pages/user/components/user-search-details'], resolve);
        }
      }],
    },
    {
      path: '/usersetting',
      name: 'userSetting',
      meta: {
        title: '设置页',
        requiresAuth: true
      },
      component: (resolve) => {
        require(['@/pages/user/user-setting'], resolve);
      }
    },
    {
      path: '/write',
      name: 'article-writing',
      meta: {
        title: '编辑',
        requiresAuth: true,
        requireSave: true
      },
      component: (resolve) => {
        require(['@/pages/article/article-writing'], resolve);
      }
    },
    {
      path: '/view/:articleid',
      name: 'article-view',
      meta: {
        title: '浏览',
        requiresAuth: true,
        requireSave: true
      },
      component: (resolve) => {
        require(['@/pages/article/article-view'], resolve);
      }
    }
  ]
})
// 导航守卫 实现 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token')) {
      // 判断登录情况
      next()
    }
    else {
      next({ path: '/login' })
    }
  }
  else {
    if (localStorage.getItem('token')) {
      next({  path: '/home' })
      // next()
    }
    else {
      next()
    }
  }
})

export default router
