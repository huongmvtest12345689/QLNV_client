import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeHRM from '../views/admin/Index'
import store from '@/store';
import {
  getAuthenticatedUser
} from "@/common/Utils";
Vue.use(VueRouter)

  const routes = [
    {
      path: '',
      name: 'HomeHRM',
      meta: {
        requiresAuth: true
      },
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
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('../views/admin/forgotPassword/ForgotPassword'),
    },
    {
      path: '/member',
      name: 'Member',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/admin/Member'),
    },
    {
      path: '/test',
      name: 'Test',
      meta: {
        requiresAuth: true,
        adminAuth: true
      },
      component: () => import('../views/admin/Test'),
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    getAuthenticatedUser()
        .then(data => {
          console.log(data)
          if (store.getters.isLoggedIn === true && data.status === 200) {
            store.commit('SET_USER', data.object)
            if(to.meta.adminAuth) {
              if(data.object.roleName === "ROLES_ADMIN") {
                next()
              }else {
                next('/')
              }
            } else if (to.meta.memberAuth) {
              if(data.object.roleName === "ROLES_MEMBER") {
                next()
              }else {
                next('/')
              }
            }
            next()
            return
          }
          next('/login')
        }).catch(error => {
          console.log(error)
          next('/login')
        })
  } else {
    next()
  }
})

export default router
