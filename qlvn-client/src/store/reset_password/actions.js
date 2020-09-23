import * as types from './mutation-types'
export default {
    
    setCode({commit},data){
        commit(types.SET_CODE,data)
    },
    setNewPassword({commit},data){
        commit(types.SET_NEW,data)
    },
    setConfirmPassword({commit},data){
        commit(types.SET_CONFIRM,data)
    }
}