

import { Request, Response } from "express";
import { registerUserService, getAllUsersService, getUserByIdService, loginUserService } from "../services/userServices/users";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { validateCredential } from "../services/credentialsServices/credentials";

export const getAllUsersController = async (req:Request,res:Response) =>{
    try {
        const users: User[] | null = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(`Error getting users ${error}`);
    }
}

export const getUserByIdController = async (req:Request,res:Response) =>{
 try {
    const {id} = req.params;
    const user:User | null = await getUserByIdService(Number(id));
    res.status(200).json(user)
 } catch (error) {
    res.status(404).json(`ID  not found ${error}`)
 }
};

export const registerUserController = async (req:Request,res:Response) =>{
  try {
    const {name, email, birthdate, nDni, username, password} = req.body;
    const newUser: User = await registerUserService({name, email, birthdate, nDni, username, password})
    res.status(201).json(newUser)  
} catch (error) {
    res.status(400).json(`Incorrect data when creating the user. ${error}`)
  }
};

export const loginUserController = async (req:Request,res:Response) =>{
  const {username, password} = req.body;
  try {
    const userLogin: Credential = await validateCredential({username, password})
    const user: User | null = await loginUserService(userLogin.id)
    res.status(200).json({login: true, user} )
  } catch (error) {
    res.status(400).json(`Error trying to login ${error}`)
  }
};

