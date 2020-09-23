import * as types from './mutation-types'
export default {
    [types.SET_CURR](state,payload) {
        state.currPassword = payload
    },
    [types.SET_NEW](state,payload) {
        state.newPassword = payload
    },
    [types.SET_CONFIRM](state,payload) {
        state.confirmPassword = payload
    }

}