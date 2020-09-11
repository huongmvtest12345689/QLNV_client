import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default new Vuex.Store({
    state: {
        // i18n data
        countryChange: 'en',
        //userList screen data
        userList: null,
        data: [],
        files: [],
        filename: '',
        messages: [],

    },
    getters,
    mutations,
    actions
})
