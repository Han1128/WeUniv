import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/index'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/js/iconfont.js'
import './assets/css/icon.css'
import components from './components'
import './less/index.less'


Vue.config.productionTip = false;
Vue.use(axios);
Vue.use(iView);
// Vue.use(ElementUI);
Vue.use(components);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
