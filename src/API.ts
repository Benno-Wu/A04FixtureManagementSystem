import API, { apiF, iApi, request, URN } from "simplified-fetch"
import { baseURL } from './constant'

declare global {
    var Api: iApi & Apis
}

// type apis = 'registerUser' | 'loginUser' | 'selfUser' | 'allUser' | 'allUserPut'
//     | 'requestFix' | 'pagedFix' | 'finalFix'
//     | 'pagedUseless' | 'requestUseless' | 'firstUseless' | 'finalUseless'
//     | 'pagedScheduling' | 'addScheduling'
//     | 'pagedPurchase' | 'requestPurchase' | 'firstPurchase' | 'finalPurchase'
//     | 'pagedFixture' | 'updateFixture' | 'searchFixture'

// type config = Record<apis, URN | request>

type APIConfig<apis> = {
    [propName in keyof apis]: request | URN;
}

const configs: APIConfig<Apis> = {
    registerUser: { urn: `/user/register` },
    loginUser: { urn: `/user/login` },
    selfUser: { urn: `/user/self`, config: { method: 'GET' } },
    allUser: { urn: `/user/all` },
    allUserPut: { urn: `/user/all`, config: { method: 'PUT' } },
    requestFix: { urn: `/fix/request` },
    pagedFix: { urn: '/fix/paged' },
    finalFix: { urn: '/fix/final', config: { method: 'PUT' } },
    pagedUseless: { urn: '/useless/paged' },
    requestUseless: { urn: '/useless/request' },
    firstUseless: { urn: '/useless/first', config: { method: 'PUT' } },
    finalUseless: { urn: '/useless/final', config: { method: 'PUT' } },
    pagedScheduling: { urn: '/scheduling/paged' },
    addScheduling: { urn: '/scheduling/add' },
    pagedPurchase: { urn: '/purchase/paged' },
    requestPurchase: { urn: '/purchase/request' },
    firstPurchase: { urn: '/purchase/first', config: { method: 'PUT' } },
    finalPurchase: { urn: '/purchase/final', config: { method: 'PUT' } },
    pagedFixture: { urn: '/fixture/paged' },
    updateFixture: { urn: '/fixture/update' },
    searchFixture: '/fixture/search',
}

API.init({
    baseURL,
    method: 'POST',
    mode: 'cors',
}, configs)

function getCookie(name: string) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
Api.request.use((url, config: any) => {
    config.headers['Authorization'] = 'Bearer ' + getCookie('a04');
})

Api.request.use((url, request) => {
    console.log(request)
})

type res<T> = Promise<{
    success: boolean,
    data: T,
    message: string,
}>

// todo: change any to specific interface
interface Apis {
    registerUser: apiF<any, any, res<any>>,
    loginUser: apiF<any, any, res<any>>,
    selfUser: apiF<any, any, res<any>>,
    allUser: apiF<any, any, res<any>>,
    allUserPut: apiF<any, any, res<any>>,
    requestFix: apiF<any, any, res<any>>,
    pagedFix: apiF<any, any, res<any>>,
    finalFix: apiF<any, any, res<any>>,
    pagedUseless: apiF<any, any, res<any>>,
    requestUseless: apiF<any, any, res<any>>,
    firstUseless: apiF<any, any, res<any>>,
    finalUseless: apiF<any, any, res<any>>,
    pagedScheduling: apiF<any, any, res<any>>,
    addScheduling: apiF<any, any, res<any>>,
    pagedPurchase: apiF<any, any, res<any>>,
    requestPurchase: apiF<any, any, res<any>>,
    firstPurchase: apiF<any, any, res<any>>,
    finalPurchase: apiF<any, any, res<any>>,
    pagedFixture: apiF<any, any, res<any>>,
    updateFixture: apiF<any, any, res<any>>,
    searchFixture: apiF<any, any, res<any>>,
}
