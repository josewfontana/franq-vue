import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  const isAuthenticated = !!user

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signup')
  } else {
    next()
  }
})

export default router
