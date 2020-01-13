import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  mutations: {
    //保存用户信息
    SAVE_USERINFO: (state, param) => {
      localStorage.setItem('userInfo', JSON.stringify(param))
      state.userInfo = param
    },
    //移除用户信息
    REMOVE_USERINFO: state => {
      localStorage.removeItem('userInfo')
      state.userInfo = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
