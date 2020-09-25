import Vue from 'vue'
import Vuex from 'vuex'
import {CHANGE_COUNTRY} from './ActionStore'

Vue.use(Vuex)

// const getDefaultState = () => {
//   return {
//     countryChange: 'en',
//     isLoggedIn: false,
//     user: null,
//   };
// };
export default new Vuex.Store({
  state: {
    countryChange: 'en',
    isLoggedIn: !!localStorage.getItem("token"),
    user: null,
  },
  mutations: {
    CHANGE_COUNTRY(state, data) {
      state.countryChange = data || 'en'
    },
    LOGIN(state, isAuthenticated) {
      state.isLoggedIn = isAuthenticated
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    changeCountry({commit}) {
      commit(CHANGE_COUNTRY)
    },
    loadUser: ({ commit }, res) => {
      // let url = "http://localhost:8080/api/user/info-login";
      // api.apiNotParamGet(url).then(res => {
      //   if (res.data.status === 200) {
          commit('SET_USER', res.data.object.user)
          localStorage.setItem("token", "JWT");
          commit('LOGIN', true)
      //   }
      // })
    },
    logout: ({ commit }) => {
      localStorage.removeItem("token");
      commit('RESET');
    },
  },
  modules: {
  },
  getters : { 
    countryChange: state => {return state.countryChange},
    getUser: state => {return state.user},
    isLoggedIn: state => {return state.isLoggedIn},
  }
})
