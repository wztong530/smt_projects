import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/anchorSearch',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/home/anchorSearch',
        name: 'anchorSearch',
        component: () => import('@/views/HomeModules/AnchorSearch.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/home/anchorRanking',
        name: 'anchorRanking',
        component: () => import('@/views/HomeModules/AnchorRanking.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/home/anchorDetail',
        name: 'anchorDetail',
        component: () => import('@/views/HomeModules/AnchorDetail.vue')
      },
      {
        path: '/home/scenicWords',
        name: 'scenicWords',
        component: () => import('@/views/HomeModules/ScenicWords.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/home/hotVideos',
        name: 'hotVideos',
        component: () => import('@/views/HomeModules/HotVideos.vue'),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/*',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router