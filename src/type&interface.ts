export interface iUser {
    id: number
    born: Date
    user: string
    password: string
    name: string
    authority: Auth

    useless: iUseless[]
    fix: iFix[]
    scheduling: iScheduling[]
    purchase: iPurchase[]
}

export interface iFix {
    id: number
    born: Date
    note: string
    state: Array<iState>

    user: iUser
    fixture: iFixture
}

export interface iFixture {
    id: number
    born: Date
    code: string
    name: string
    usedFor: string
    useCount: number
    PMPeriod: number
    location: string
    pic: string
    state: string

    useless: iUseless[]
    fix: iFix[]
    scheduling: iScheduling[]
}

export interface iPurchase {
    id: number
    born: Date
    state: Array<iState>
    price: number
    billNo: string

    user: iUser
    fixture: iFixture[]
}

export interface iScheduling {
    state: Array<iState>

    user: iUser
    fixture: iFixture
}

export interface iUseless {
    id: number
    born: Date
    note: string
    state: Array<iState>

    user: iUser
    fixture: iFixture
}

export interface Paged {
    size: number
    num: number
}

// 通用化审核等序列添加信息
export interface iState {
    username: string
    time: Date
    desc: string
    // 用于表述出入口、审核
    bool: Boolean
}

export interface Auth {
    scheduling: number
    purchase: number
    fix: number
    discard: number
    user: number
    fixture: number
}

export interface iAction<T> {
    [opearte: string]: (payload: Partial<T>) => { payload: Partial<T>, type: Symbol }
}