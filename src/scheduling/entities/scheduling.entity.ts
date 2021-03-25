import { Fixture } from "src/fixture/entities/fixture.entity";
import { State } from "src/utils";
import { User } from "src/user/entities/user.entity";
import { BaseEntity } from "src/utils/baseEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * @property born 记录产生时间
 * @property state [{time,update,...},{}]每次更改状态，push
 */
@Entity()
export class Scheduling extends BaseEntity<Scheduling>{
    @Column("simple-array")
    state: Array<State>
    @Column()
    user: number
    @Column()
    fixture: number | string

    @ManyToOne(() => User, user => user.scheduling)
    @JoinColumn({ name: 'user' })
    user_: User
    @ManyToOne(() => Fixture, fixture => fixture.scheduling)
    @JoinColumn({ name: 'fixture' })
    fixture_: Fixture

    constructor(partial: Partial<Scheduling>) {
        super(partial)
    }
}
