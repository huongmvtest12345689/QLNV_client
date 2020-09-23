import * as types from './mutation-types'
export default {
    [types.SET_CODE](state,payload) {
        state.code = payload
    },
    [types.SET_NEW](state,payload) {
        state.newPassword = payload
    },
    [types.SET_CONFIRM](state,payload) {
        state.confirmPassword = payload
    }

}