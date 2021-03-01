import { Column, PrimaryGeneratedColumn } from "typeorm"

// todo: work check
/**
 * @property born 记录产生时间
 */
export abstract class BaseEntity<T>{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    born: Date

    constructor(partial: Partial<T>) {
        Object.assign(this, partial)
        this.born = new Date()
    }
}