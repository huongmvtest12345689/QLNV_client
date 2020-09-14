import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueCookies from 'vue-cookies'
// create service
const service = {
    init () {
        Vue.use(VueAxios, axios)
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API
        axios.interceptors.response.use((response) => {
            return response
        })
    },
    get (resource, params) {
      return axios.get(resource, params).catch(error => {
        throw error
      })
    },
    post (resource, params) {
      return axios.post(`${resource}`, params)
    }
    ,
}
// response interceptor
export default service