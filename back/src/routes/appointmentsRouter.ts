import { Router } from "express";
import { cancelAppointmentsController, getAllAppointmentsController, getAppointmentByIdController, postAppointmentController } from "../controllers/appointmentsController";

export const appointmentsRouter:Router = Router();

appointmentsRouter.get("/", getAllAppointmentsController)

appointmentsRouter.get("/:id", getAppointmentByIdController)

appointmentsRouter.post("/schedule", postAppointmentController)

appointmentsRouter.put("/cancel/:id", cancelAppointmentsController)