import { Fix } from "src/fix/entities/fix.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Scheduling } from "src/scheduling/entities/scheduling.entity";
import { Useless } from "src/useless/entities/useless.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * @property born 记录产生时间
 * @property state 每次更改状态，改变文本内容
 * @property PMPeriod 点检周期
 */
@Entity()
export class Fixture {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    born: Date
    @Column()
    code: string
    @Column()
    name: string
    @Column()
    usedFor: string
    @Column()
    useCount: number
    @Column()
    PMPeriod: number
    @Column()
    location: string
    @Column()
    pic: string
    @Column()
    state: string

    @OneToMany(() => Useless, useless => useless.fixture)
    useless: Useless[]
    @OneToMany(() => Fix, fix => fix.fixture_, { cascade: true })
    fix: Fix[]
    @OneToMany(() => Scheduling, scheduling => scheduling.fixture_, { cascade: true })
    scheduling: Scheduling[]
}
