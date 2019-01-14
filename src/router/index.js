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
        noCheckSession: true
      },
      component: (resolve) => {
        require(['@/pages/login/Login'], resolve);
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token')) {
      // 判断登录情况
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
  // if(to.matched.some (record => !record.meta.noCheckSession)) {
  //   if(!isLogin) {
  //     console.error('Pleace Login');
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath } // 跳转到登录页
  //     })
  //   }
  //   else {
  //     next();
  //   }
  // }
  // else {
  //   next();
  // }
})

export default router
