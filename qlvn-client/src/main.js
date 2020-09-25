import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import Toolbar from 'primevue/toolbar';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Fieldset from 'primevue/fieldset';
import ColorPicker from 'primevue/colorpicker'
import JQuery from 'jquery'
// import {
//   getAuthenticatedUser
// } from "@/common/Utils";


/** Global Components */
import ApiService from '@/common/ApiService'
import './global.js'
import i18n from './i18n.js'
import Vuelidate from 'vuelidate';
Vue.config.productionTip = false
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('Button', Button);
Vue.component('InputText', InputText);
Vue.component('FileUpload', FileUpload);
Vue.component('Toolbar', Toolbar);
Vue.component('Toast', Toast);
Vue.component('Fieldset', Fieldset);
Vue.component('ColorPicker', ColorPicker);

Vue.use(ToastService);
Vue.use(Vuelidate);

Vue.prototype._$ = JQuery

ApiService.init();

// async function init() {
//   router.beforeEach(async (to, from, next) => {
//     if (to.path !== "/login") {
//       await getAuthenticatedUser();
//       if (store.getters.isLoggedIn === false) {
//         next("/login");
//       } else {
//         next();
//       }
//     } else {
//       next();
//     }
//   });
//
//   new Vue({
//     router,
//     store,
//     i18n,
//     render: h => h(App)
//   }).$mount("#app");
// }
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
// init();