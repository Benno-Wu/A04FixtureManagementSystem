import API, { apiF, BaseConfig, iApi, URN, bodyAsParams, iPipe, PipeRequest, PipeResponse, request } from "simplified-fetch"

declare global {
    // var Api: iApi & Record<apis, apiF<{
    //     success: boolean,
    //     data: unknown,
    //     message: string,
    // }>>
    var Api: target
}

// type apiF<T> = (body?: bodyAsParams, params?: Array<unknown>) => Promise<T>

type apis = 'registerUser' | 'loginUser' | 'selfUser' | 'allUser' | 'allUserPut'
    | 'requestFix' | 'pagedFix' | 'finalFix'
    | 'pagedUseless' | 'requestUseless' | 'firstUseless' | 'finalUseless'
    | 'pagedScheduling' | 'addScheduling'
    | 'pagedPurchase' | 'requestPurchase' | 'firstPurchase' | 'finalPurchase'
    | 'pagedFixture' | 'updateFixture'

// // todo minify this type
type config = Record<apis, request>
// type aaa = { urn: URN, config?: BaseConfig }

const configs: config = {
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
}

API.init({
    baseURL: `http://127.0.0.1:3001`,
    method: 'POST',
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
    return false
})



// type what = {
//     [key in apis]: apiF<target[key]>
// }

// type a = {
//     a: number,
//     b: number,
//     c: string,
// }
// type aa = 'a' | 'b' | 'c'

// class test<T extends string, R extends object>{
//     constructor(obj: Record<T, R>) {
//         for (const key in Object.keys(obj)) {
//             let a: R[key] = {};
//             (<any>this)[key] = a
//         }
//     }
// }

type res<T> = Promise<{
    success: boolean,
    data: T,
    message: string,
}>

interface target extends iApi {
    registerUser: apiF<res<any>>,
    loginUser: apiF<res<any>>,
    selfUser: apiF<res<any>>,
    allUser: apiF<res<any>>,
    allUserPut: apiF<res<any>>,
    requestFix: apiF<res<any>>,
    pagedFix: apiF<res<any>>,
    finalFix: apiF<res<any>>,
    pagedUseless: apiF<res<any>>,
    requestUseless: apiF<res<any>>,
    firstUseless: apiF<res<any>>,
    finalUseless: apiF<res<any>>,
    pagedScheduling: apiF<res<any>>,
    addScheduling: apiF<res<any>>,
    pagedPurchase: apiF<res<any>>
    requestPurchase: apiF<res<any>>,
    firstPurchase: apiF<res<any>>,
    finalPurchase: apiF<res<any>>,
    pagedFixture: apiF<res<any>>,
    updateFixture: apiF<res<any>>,
}

// export const created = API.create({}, {}) as target

// created.getA(1)
