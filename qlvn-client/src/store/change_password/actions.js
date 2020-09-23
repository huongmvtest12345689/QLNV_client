import * as types from './mutation-types'
export default {
    
    setCurrPassword({commit},data){
        commit(types.SET_CURR,data)
    },
    setNewPassword({commit},data){
        commit(types.SET_NEW,data)
    },
    setConfirmPassword({commit},data){
        commit(types.SET_CONFIRM,data)
    }
}