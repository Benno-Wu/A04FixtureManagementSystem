export interface Paged {
    size: number
    num: number
}

// todo
// 通用化审核等序列添加信息
export interface State {
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
