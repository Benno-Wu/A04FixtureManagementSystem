import { ApiProperty } from "@nestjs/swagger"

export class Paged {
    @ApiProperty()
    size: number
    @ApiProperty()
    num: number
}

// todo
// 通用化审核等序列添加信息
export class State {
    @ApiProperty()
    username: string
    @ApiProperty()
    time: Date
    @ApiProperty()
    desc: string
    // 用于表述出入口、审核
    @ApiProperty()
    bool: Boolean
}

export class Auth {
    @ApiProperty()
    scheduling: number
    @ApiProperty()
    purchase: number
    @ApiProperty()
    fix: number
    @ApiProperty()
    discard: number
    @ApiProperty()
    user: number
    @ApiProperty()
    fixture: number
}
