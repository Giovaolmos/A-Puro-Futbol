import { appointmentModel, userModel } from "../../config/data-source";
import { appointmentDto } from "../../dtos/appointmentDto";
import { Appointment } from "../../entities/Appointment";
import { User } from "../../entities/User";




export const getAllAppointmentsService = async ():Promise<Appointment[]> =>{
   const appointments: Appointment[] = await appointmentModel.find();
   if(appointments.length === 0) throw new Error("There are no appointments");
   else return appointments
};

export const getAppointmentByIdService = async (id:number):Promise<Appointment | null> =>{
    const appointment = await appointmentModel.findOne({where:{id}, relations: {user: true}});
    return appointment;
}

export const createAppointmentService = async (appointment: appointmentDto): Promise<Appointment> => {
    const user: User | null = await userModel.findOneBy({ id: appointment.userId });
    if (!user) {
        throw new Error("userId not found");
    }

    const newAppointment: Appointment = appointmentModel.create(appointment);
    newAppointment.user = user;
    await appointmentModel.save(newAppointment);

    return newAppointment;
};



export const cancelAppointmentsService = async (id: number): Promise<Appointment> => {
    const appointment: Appointment | null = await appointmentModel.findOne({ where: { id }, relations: ["user"] });
    if (!appointment) {
        throw new Error("Appointment not found");
    }
    appointment.status = "Cancelled";
    await appointmentModel.save(appointment);
    return appointment;
};

