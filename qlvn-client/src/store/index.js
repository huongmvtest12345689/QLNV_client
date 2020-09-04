import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_COUNTRY } from './ActionStore'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countryChange: 'en'
  },
  mutations: {
    CHANGE_COUNTRY(state, data) {
      state.countryChange = data || 'en'
    }
  },
  actions: {
    changeCountry({commit}) {
      commit(CHANGE_COUNTRY)
    }
  },
  modules: {
  },
  getters : { 
    countryChange: state => state.countryChange
  }
})
