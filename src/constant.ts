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
export const roleMap = {
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
