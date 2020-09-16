import * as types from './mutation-types'
export default {
    changeCountry({commit},data) {
        commit(types.CHANGE_COUNTRY,data)
      }
}