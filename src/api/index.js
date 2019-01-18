import axios from './axios'
import VueAxios from 'vue-axios'
export default {
  install(Vue) {
    Vue.use(VueAxios, axios);
  }
};
