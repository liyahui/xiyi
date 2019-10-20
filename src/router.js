import Vue from 'vue'
import Router from 'vue-router'
import * as store from './utils/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'order',
      component: () => import('./pages/Order')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const merchant = store.get('merchant')
  if (to.name === 'login') {
    merchant ? next('/') : next()
  } else {
    merchant ? next() : next('/login')
  }
})

export default router