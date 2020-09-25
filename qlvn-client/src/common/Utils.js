import api from "@/api";

export function getAuthenticatedUser() {
    let url = "http://localhost:8080/api/user/info-login";
    const promise =  api.apiNotParamGet(url)

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)

    // return it
    return dataPromise
}