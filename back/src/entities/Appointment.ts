import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"

@Entity({name:"appointments"})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    description:string

    @Column()
    time: string

    @Column({default: "Active"})
    status:string

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn()
    user: User
}