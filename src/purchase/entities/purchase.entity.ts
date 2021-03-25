import { Fixture } from "src/fixture/entities/fixture.entity";
import { State } from "src/utils";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/**
 * @property born 记录产生时间
 * @property state [{time,update,...},{}]每次更改状态，push
 */
@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    born: Date
    @Column("simple-array")
    state: Array<State>
    @Column()
    price: number
    @Column()
    billNo: string

    @ManyToOne(() => User, user => user.purchase)
    user: User
    @ManyToMany(() => Fixture, { cascade: true })
    @JoinTable()
    fixture: Fixture[]
}
