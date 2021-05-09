import { Fixture } from "src/fixture/entities/fixture.entity";
import { State } from "src/utils";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * @property born 记录产生时间
 * @property state [{time,update,...},{}]每次更改状态，push
 */
@Entity()
export class Fix {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    born: Date
    @Column()
    note: string
    @Column("simple-json")
    state: Array<State>
    @Column()
    fixture: number | string

    @ManyToOne(() => User, user => user.fix)
    user: User
    @ManyToOne(() => Fixture, fixture => fixture.fix)
    @JoinColumn({ name: 'fixture' })
    fixture_: Fixture
}
