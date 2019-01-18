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
        title: '登录页'
      },
      component: (resolve) => {
        require(['@/pages/account/Login'], resolve);
      }
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '登录页'
      },
      component: (resolve) => {
        require(['@/pages/account/Register'], resolve);
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
    }
  ]
})
// 导航守卫 实现 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('路由验证')
    if (localStorage.getItem('token')) {
      // 判断登录情况
      console.log('token存在')
      next();
    }
    else {
      console.log('token不存在')
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
})

export default router
