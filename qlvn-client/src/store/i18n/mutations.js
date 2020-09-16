import * as types from './mutation-types'
export default {
    [types.CHANGE_COUNTRY](state, data) {
        state.countryChange = data || 'en'
    },

}