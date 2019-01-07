import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
        require(['@/pages/login/Login'], resolve);
      }
    },
    {
      path: '/home',
      name: 'BaseHomeFramework',
      meta: {
        title: '首页'
      },
      component: (resolve) => {
        require(['@/pages/home/BaseHomeFramework'], resolve);
      }
    }
  ]
})
