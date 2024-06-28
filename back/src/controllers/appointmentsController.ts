

import { Request, Response } from "express";
import { cancelAppointmentsService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService } from "../services/appointmentsServices/appointments";
import { Appointment } from "../entities/Appointment";

export const getAllAppointmentsController = async (req:Request,res:Response):Promise<void> =>{
   try {
    const appointments: Appointment[] = await getAllAppointmentsService();
    res.status(201).json(appointments);
   } catch (error) {
    res.status(400).json(`Error trying to get appointments ${error}`);
   }
};

export const getAppointmentByIdController = async (req:Request,res:Response):Promise<void> =>{
    try {
        const {id} = req.params;
        const appointment: Appointment | null = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json(`No appointments found with this ID ${error}`);
    }
};

export const postAppointmentController = async (req: Request, res: Response):Promise<void> => {
    const {date, time,description, userId, } = req.body;
    try {
     const newAppointment = await createAppointmentService({date, time, description, userId})
     res.status(201).json(newAppointment)
    } catch (error) {
     res.status(400).json(`Error creating appointment  ${error}`)
    }
   
 };

export const cancelAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const canceledAppointment = await cancelAppointmentsService(Number(id));
        res.status(200).json({
            message: "Appointment successfully cancelled",
            appointment: canceledAppointment
        });
    } catch (error) {
        res.status(404).json(`Error when trying to cancel appointment ${error}`);
    }
};
