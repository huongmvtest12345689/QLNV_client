import * as types from './mutation-types'
export default {
    [types.REMEMBER_ME](state) {
        state.checked = !state.checked
    },
    [types.SET_EMAIL](state,payload) {
        state.email = payload
    },
    [types.SET_PASSWORD](state,payload) {
        state.password = payload
    }

}