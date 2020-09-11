import * as types from './mutation-types'
export default {
    setFiles({commit},files){
        commit(types.SET_FILES,files)
    },
    resetFiles({commit}){
        commit(types.RESET_FILES)
    },
    updateUserList({commit}){
        commit(types.UPDATE_USERLIST)
    },
    changeCountry({commit},data) {
        commit(types.CHANGE_COUNTRY,data)
      }
}