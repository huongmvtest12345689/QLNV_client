import {userService} from '../../services/userService/user.service'
import localStorageService from '@/services/common/localStorage.service'

const state = {
    user: localStorageService.getUser()
}

const actions = {
    // eslint-disable-next-line no-unused-vars
    login({commit},{username, password}) {
        return new Promise((resolve, reject) => {
            userService.login(username, password)
                .then(
                    () => {
                        resolve()
                    },
                    error => {
                        reject(error)
                    }
                );
        })
    },
    logout() {
        return new Promise(resolve => {
            userService.logout()
                .then(
                    () => {
                        resolve()
                    }
                );
        })
    },
    getUser({commit}) {
        userService.getByToken().then(user => {
            commit('loginSuccess', user)
        })
    }
};

const mutations = {
    loginSuccess(state, user) {
        state.user = user;
    },
};

const getters = {
    getUser: state =>{
        return state.user;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
