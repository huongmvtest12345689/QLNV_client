import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../components/dashboard/Dashboard";

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

// khi nao lam login se lam o day
router.beforeEach((to, from, next) => {
  // const publicPages = ['/login', '/error', '/access', '/notfound'];
  // const authRequired = !publicPages.includes(to.path.toLowerCase());
  // const loggedIn = !!JwtService.getToken();
  //
  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }
  //
  // if(to.path === '/login' && loggedIn){
  //   return next('/')
  // }

  next();
})

export default router
