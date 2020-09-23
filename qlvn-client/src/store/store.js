import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './login'
import i18n from './i18n'
import change_password from './change_password'
import reset_password from './reset_password'
export default new Vuex.Store({
    modules:{
        'login': login,
        'i18n': i18n,
        'change_password': change_password,
        'reset_password': reset_password
    }
    
})