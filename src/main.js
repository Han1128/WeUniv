import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/index'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import components from './components'
import '@/assets/css/index.css'
// import '@/common/rem.js'

Vue.config.productionTip = false;
// Vue.use(VueAxios, axios);
Vue.use(axios);
Vue.use(iView);
// Vue.use(ElementUI);
Vue.use(components);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
