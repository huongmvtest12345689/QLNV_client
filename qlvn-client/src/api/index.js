import ApiService from '@/common/ApiService'
export default {
    apiParamPost (url, data) {
        return new Promise((resolve, reject) => {
            console.log('apiParamPost')
            ApiService.post(url, data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    apiParamGet (url, data) {
        return new Promise((resolve, reject) => {
            console.log('apiParamGet')
            ApiService.get(url, data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    apiNotParamGet (url) {
        return new Promise((resolve, reject) => {
            console.log('apiNotParamGet')
            ApiService.get(url).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    apiNotParamPost (url) {
        console.log('apiNotParamPost')
        return new Promise((resolve, reject) => {
            ApiService.post(url).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
