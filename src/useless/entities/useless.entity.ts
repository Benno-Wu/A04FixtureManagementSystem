import { Fixture } from "src/fixture/entities/fixture.entity";
import { State } from "src/utils";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

/**
 * @property born 记录产生时间
 * @property state [{time,update,...},{}]每次更改状态，push
 */
@Entity()
export class Useless {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    born: Date
    @Column()
    note: string
    @Column("simple-json")
    state: Array<State>

    @ManyToOne(() => User, user => user.useless)
    user: User
    @ManyToOne(() => Fixture, fixture => fixture.useless)
    fixture: Fixture

    constructor() {
        this.born = new Date()
    }
}
