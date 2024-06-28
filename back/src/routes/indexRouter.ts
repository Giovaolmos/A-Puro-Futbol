import { Router } from "express";
import { usersRouter } from "./usersRouter";
import { appointmentsRouter } from "./appointmentsRouter";

export const indexRouter:Router = Router();
indexRouter.use("/users", usersRouter);

indexRouter.use("/appointments", appointmentsRouter);
