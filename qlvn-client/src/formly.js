import Vue from 'vue'
import VueFormly from 'vue-formly';
Vue.use(VueFormly);
import InputTexField from './components/common/formly/InputTexField.vue';
VueFormly.addType('InputTexField', InputTexField);
