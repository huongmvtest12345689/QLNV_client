import * as types from './mutation-types'
export default {
    rememberMe({commit}){
        commit(types.REMEMBER_ME)
    },
    // setter for login
    setEmail({commit},data){
        commit(types.SET_EMAIL,data)
    },
    setPassword({commit},data){
        commit(types.SET_PASSWORD,data)
    }
}