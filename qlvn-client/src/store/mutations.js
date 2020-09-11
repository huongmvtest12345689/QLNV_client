import http from '../http-common';
import * as types from './mutation-types'
export default {
    [types.SET_FILES](state,files){
        state.files = files
    },
    [types.RESET_FILES](state){
        state.files = []
    },
    async [types.UPDATE_USERLIST](state){
        await http.get('/api/admin/user/all')
        .then(res => {
          state.data = res.data.object;     
          });
    },
    [types.CHANGE_COUNTRY](state, data) {
        state.countryChange = data || 'en'
    }
}
