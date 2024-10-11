import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { checkLoginStatus } from '@/composables/apis'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        const res = await checkLoginStatus()
        if (res.data.status !== 200) return next()
        next({ path: '/' })
    }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth) return next()
  try {
    const res = await checkLoginStatus()
    if (res.data.status !== 200) return next('/login')
    next()
  } catch (error) {
    next('/login')
  }
})

export default router
