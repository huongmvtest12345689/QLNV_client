import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeHRM from '../views/admin/Index'

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
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
