import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
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
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver} from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

/** Global Components */
import './global.js'
import i18n from './i18n.js'
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
Vue.prototype._$ = JQuery
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
