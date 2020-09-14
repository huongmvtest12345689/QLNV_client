import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeHRM from '../views/admin/Index'
import ChangePassoword from '../views/admin/change_password/ChangePassword'

Vue.use(VueRouter)

  const routes = [
    {
      path: '',
      name: 'HomeHRM',
      component: HomeHRM,
      children: [
        {
          path: '/hrmHome',
          name: 'hrmHome',
          component: () => import('../views/admin/home/Home'),
        },
        {
          path: '/admin/userList',
          name: 'userList',
          component: () => import('../views/admin/user/User'),
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/admin/login/Login'),
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassoword
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
