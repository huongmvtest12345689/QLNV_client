import config from '../../global'
import localStorageService from '@/services/common/localStorage.service'
import axios from 'axios'

export const userService = {
    login,
    logout,
    getByToken,
    changePassword
};

function authHeader() {
    let token = localStorageService.getToken();

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }

}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
            'username' : username,
            'password' : password
        },
        url: `${config.apiUrl}/user/login`
    };

    return axios(requestOptions)
        .then(response => {
            localStorageService.saveToken(response.headers.authorization)
        }).catch(handleError)
}

function logout() {
    // remove user from local storage to log user out
    localStorageService.destroyAll()
}


function getByToken() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        url: `${config.apiUrl}/user/get-user`
    };
    return axios(requestOptions).then(handleResponse).catch(handleError);
}

function changePassword(obj) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        data: obj,
        url: `${config.apiUrl}/user/change-pass`
    };

    return axios(requestOptions).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
    return response.data;
}

function handleError(error) {
    let res = error.response;
    if(!res) {
        return Promise.reject(error.message);
    }
    if(res.status === 401){
        logout();
    }
    return Promise.reject(res.data.message);
}
