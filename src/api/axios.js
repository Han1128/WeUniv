/**
 * axios配置
 * 拦截器
 **/
import axios from 'axios';
import router from '../router/index';

// 创建一个axios实例
const instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 10000, // 超时验证
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// http 请求拦截
instance.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      // 判断每个请求的token是否存在,如果存在则在请求头加上token
      console.log('请求拦截token存在');
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// http响应拦截器
instance.interceptors.response.use(
  res => {
    console.log('正常响应');
    return res;
  },
  err => {
    console.log('响应拦截服务端错误状态码');
    if (err && err.response) {
      switch(err.response.status) {
        case '400':
          err.message = '错误请求';
          break;
        case '401':
          // 清除token信息并转到登录页面
          localStorage.removeItem('token');
          router.replace({
            path:'/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          err.message = '未授权,重新登录';
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    }
    else {
      err.message = '连接到服务器失败';
    }
    console.log('err message', err.message);
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
)

export default instance;
