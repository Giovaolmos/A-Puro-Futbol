import { User } from "../entities/User"

export interface appointmentDto{
    date: Date
    time: string
    description:string
    userId: User["id"]
   
};