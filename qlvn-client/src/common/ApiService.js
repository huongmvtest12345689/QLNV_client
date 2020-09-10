import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
// create service
const service = {
    init () {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_API
        Vue.axios.interceptors.response.use((response) => {
            return response
        }, (error) => {
            // Do something
        })
    },
    get (resource, params) {
      return Vue.axios.get(resource, params).catch(error => {
        throw error
      })
    },
    post (resource, params) {
      return Vue.axios.post(`${resource}`, params)
    }
    ,
}
// response interceptor
export default service