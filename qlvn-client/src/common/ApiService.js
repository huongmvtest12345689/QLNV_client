import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueCookies from 'vue-cookies'
// create service
const service = {
    init () {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_API
        Vue.axios.defaults.withCredentials = true
        Vue.axios.interceptors.response.use((response) => {
            return response
        }, () => {
            // Do something
        })
    },
    get (resource, params) {
      return axios.get(resource, params).catch(error => {
        throw error
      })
    },
    post (resource, params) {
      return axios.post(`${resource}`, params)
    },
    put (resource, params) {
        return axios.put(`${resource}`, params)
    },
}
// response interceptor
export default service