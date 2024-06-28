// En el servicio de credenciales:

import { credentialModel } from "../../config/data-source";
import { credentialDto } from "../../dtos/credentialDto";
import { Credential } from "../../entities/Credential";




export const createCredentialService = async (credential: credentialDto) => {
   const newCredential: Credential = await credentialModel.create(credential);
   const result = await credentialModel.save(newCredential);
   return result;
}

export const validateCredential = async (validateCredential: credentialDto):Promise<Credential> =>{
    const {username, password} = validateCredential;
    const login: Credential | null = await credentialModel.findOneBy({username});
    if(!login) throw Error("This data does not belong to a user");
    if (password !== login.password) throw Error ("Incorrect data");
    return login
};