import axios from 'axios'
import QS from 'qs'
// import { Loading, Message } from 'element-ui'
// import router from '../router/index.js'

//设置请求超时
axios.defaults.timeout = 100000
//设置默认请求地址
// axios.defaults.baseURL = '/api' //开发环境
axios.defaults.baseURL = 'https://mall.xpaik.com/smdouyin'
//设置默认的post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
/**
 * 
  //定义Loading加载事件
  let loading
  function startLoading() {
    loading = Loading.service({
      lock: true,
      text: '加载中....',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  function endLoading() {
      loading.close()
  }

  //http request 拦截器
  axios.interceptors.request.use(
    config => {
      startLoading()
      //设置请求头，验证是否登录
      if (localStorage.userToken) {
        config.headers.Authorization = localStorage.userToken
      }
      return config
    }
  )
  //http response 拦截器
  axios.interceptors.response.use(
    response => {
      endLoading()
      return response
    },
    error => {
      Message.error('请求错误')
      endLoading()
      return Promise.reject(error)
    }
  )  
 */

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}