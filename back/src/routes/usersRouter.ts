import { Router } from "express";
import { getAllUsersController, getUserByIdController, loginUserController, registerUserController } from "../controllers/usersController";
import { registerUserMiddleware } from "../middlewares/registerUser";
import { loginMiddleware } from "../middlewares/loginUser";

export const usersRouter: Router = Router();

usersRouter.get("/", getAllUsersController);

usersRouter.get("/:id", getUserByIdController);

usersRouter.post("/register",registerUserMiddleware, registerUserController);

usersRouter.post("/login", loginMiddleware, loginUserController);