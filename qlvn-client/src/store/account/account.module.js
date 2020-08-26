import {userService} from '../../services/userService/user.service'
import localStorageService from '@/services/common/localStorage.service'

const state = {
    user: localStorageService.getUser()
}

const actions = {
    login({commit}, {username, password}) {
        return new Promise((resolve, reject) => {
            userService.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        resolve()
                    },
                    error => {
                        reject(error)
                    }
                );
        })

    },
    logout({commit}) {
        userService.logout();
        commit('logout');
    }
};

const mutations = {
    loginSuccess(state, user) {
        state.user = user;
    },
    logout(state) {
        state.status = {};
    }
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
