export const codeMap = {
    '000c': 'create fail',
    '000r': 'read fail',
    '000u': 'update fail',
    '000d': 'remove fail',
    'redis-c': 'redis create fail',
    'redis-r': 'redis read fail',
    'redis-u': 'redis update fail',
    'redis-d': 'redis remove fail',
    'user-404': 'user not found',
    'user-100': 'user already exist',
    'user-101': 'user wrong password',
    'user-102': 'user update fail',
    'scheduling-100': 'scheduling state conflict',
    'fixture-404': `fixture's code isn't existed`,
    'token-404': 'invalid token',
    'state-100': 'wrong state',

}

// for fixture.state
export const fixtureMap = {
    'in': '已入库',
    'out': '已出库',
    'notPurchase': '未采购',
    'purchase': '采购中',
    'fix': '维修中',
    'notFix': '维修失败',
    'checking': '有报废风险',
    'useless': '已报废',
}

// for Array<State>
export const reviewMap = {
    'request': '申请',
    'first': '初审',
    'final': '终审',
}

export const schedulingMap = (bool) => {
    return bool ? 'out' : 'in'
}

export const resultMap = (bool) => {
    return bool ? '成功' : '失败'
}

export const picsPath = '/pics'

export const AllowList = ['login', 'register', 'exist', 'upload']

// 路径权限表
export const authMap = {
    scheduling: {
        paged: 0b01,
        add: 0b10,
    },
    purchase: {
        paged: 0b0001,
        request: 0b0010,
        first: 0b0100,
        final: 0b1000,
    },
    fix: {
        paged: 0b001,
        request: 0b010,
        final: 0b100,
    },
    useless: {
        paged: 0b0001,
        request: 0b0010,
        first: 0b0100,
        final: 0b1000,
    },
    fixture: {
        paged: 0b01,
        update: 0b10,
    },
    user: {
        self: 0b01,
        all: 0b10,
    }
}

// 角色权限分配
const roleMap = {
    worker: {
        scheduling: 0b01,
        purchase: 0b0001,
        fix: 0b001,
        useless: 0b0001,
        fixture: 0b01,
        user: 0b01,
    },
    manager: {
        scheduling: 0b11,
        purchase: 0b0011,
        fix: 0b011,
        useless: 0b0011,
        fixture: 0b01,
        user: 0b01,
    },
    supervision: {
        scheduling: 0b01,
        purchase: 0b0101,
        fix: 0b101,
        useless: 0b0101,
        fixture: 0b01,
        user: 0b01,
    },
    director: {
        scheduling: 0b01,
        purchase: 0b1001,
        fix: 0b101,
        useless: 0b1001,
        fixture: 0b11,
        user: 0b11,
    },
    admin: {
        scheduling: 0b11,
        purchase: 0b1111,
        fix: 0b111,
        useless: 0b1111,
        fixture: 0b11,
        user: 0b11,
    },
}
