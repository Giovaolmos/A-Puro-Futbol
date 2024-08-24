import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import {
  DB_DATABASENAME,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "./envs";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASENAME,
  synchronize: true,
  dropSchema: false,
  // logging: true,
  entities: [User, Appointment, Credential],
  subscribers: [],
  migrations: [],
});

export const userModel = AppDataSource.getRepository(User);
export const appointmentModel = AppDataSource.getRepository(Appointment);
export const credentialModel = AppDataSource.getRepository(Credential);
