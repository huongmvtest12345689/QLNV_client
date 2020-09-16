import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import getters from './getters'
// import mutations from './mutations'
// import actions from './actions'
import login from './login'
import i18nModule from './i18n'
export default new Vuex.Store({
    modules:{
        'login': login,
        'i18n': i18nModule
    }
    
})