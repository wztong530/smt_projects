import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import * as filter from './filter/index.js'
import echarts from 'echarts'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(echarts);
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    next()
  } else {
    if (localStorage.getItem('userInfo')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')