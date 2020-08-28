import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
/** Global Components */
import './global.js'
import './primeVue'
import Login from "./pages/Login";
import Access from "./pages/Access";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

new Vue({
  el: '#app',
  computed: {
    ViewComponent () {
      switch (this.$route.path) {
        case '/login':
          return Login;
        case '/error':
          return Error;
        case '/access':
          return Access;
        case '/notfound':
          return NotFound;
        default:
          return App;
      }
    }
  },
  router, store,
  render (h) { return h(this.ViewComponent) }
});
