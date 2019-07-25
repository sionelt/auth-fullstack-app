import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',

  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        requiresAuth: true,
        title: 'Profile',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const baseTitle = 'Your Profile'
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)

  document.title = nearestWithTitle ? `${nearestWithTitle.meta.title} - ${baseTitle}` : baseTitle

  if (to.matched.some(route => route.meta.requiresAuth)) {
    const isAuth = window.localStorage.getItem('jwtToken')

    if (!isAuth) {
      return next({
        name: 'home',
        query: { redirect: to.fullPath }
      })
    }

    next()
  } else {
    next()
  }
})

export default router
