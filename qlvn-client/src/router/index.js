import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../components/dashboard/Dashboard";
import localStorageService from '@/services/common/localStorage.service'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return {x: 0, y: 0};
  }
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/error', '/access', '/notfound'];
  const authRequired = !publicPages.includes(to.path.toLowerCase());
  const loggedIn = !!localStorageService.getToken();

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if(to.path === '/login' && loggedIn){
    return next('/')
  }

  next();
})

export default router
