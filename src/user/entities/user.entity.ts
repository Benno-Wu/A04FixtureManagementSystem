import { Exclude, Transform } from "class-transformer";
import { Fix } from "src/fix/entities/fix.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Scheduling } from "src/scheduling/entities/scheduling.entity";
import { Useless } from "src/useless/entities/useless.entity";
import { Auth } from "src/utils";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * @property born 记录产生时间
 * @property authority {name:0bxxxx,}权限0b记录
 * @property user 员工编码
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    // @CreateDateColumn()
    @Column()
    born: Date
    @Column()
    user: string
    @Exclude()
    @Column()
    password: string
    @Column()
    name: string
    @Column()
    authority: Auth

    @Transform(({ value, key, obj, type }) => value.length, { toPlainOnly: true })
    @OneToMany(() => Useless, useless => useless.user)
    useless: Useless[]
    @Transform(({ value, key, obj, type }) => value.length, { toPlainOnly: true })
    @OneToMany(() => Fix, fix => fix.user)
    fix: Fix[]
    @Transform(({ value, key, obj, type }) => value.length, { toPlainOnly: true })
    @OneToMany(() => Scheduling, scheduling => scheduling.user_, { cascade: true })
    scheduling: Scheduling[]
    @Transform(({ value, key, obj, type }) => value.length, { toPlainOnly: true })
    @OneToMany(() => Purchase, purchase => purchase.user)
    purchase: Purchase[]

    constructor(partical: Partial<User>) {
        Object.assign(this, partical)
        this.born = new Date()
    }
}
