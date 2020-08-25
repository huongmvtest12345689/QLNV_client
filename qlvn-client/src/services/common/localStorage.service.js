const ID_TOKEN_KEY = 'id_token'
const USER_INFO = 'user_info'
const HOST = window.location.hostname

export const getToken = () => {
    return get(ID_TOKEN_KEY, false)
}

export const saveToken = token => {
    save(ID_TOKEN_KEY, token, false)
}

export const getUser = () => {
    return get(USER_INFO, true)
}

export const saveUser = (user) => {
    save(USER_INFO, user, true)
}

export const get = (key, isObject) => {
    let value = window.localStorage.getItem(getKey(key))
    if (isObject) value = JSON.parse(value)
    return value
}

export const save = (key, value, isObject) => {
    if (isObject) value = JSON.stringify(value)
    window.localStorage.setItem(getKey(key), value)
}

export const getKey = (key) => {
    return HOST + '.' + key
}

export const destroyAll = () => {
    return window.localStorage.clear()
}

export default {
    getToken,
    saveToken,
    getUser,
    saveUser,
    destroyAll,
    get,
    save
}
