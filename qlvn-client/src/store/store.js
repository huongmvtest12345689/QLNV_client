import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './login'
import i18n from './i18n'
export default new Vuex.Store({
    modules:{
        'login': login,
        'i18n': i18n,
    }
    
})