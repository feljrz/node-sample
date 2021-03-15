import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response){
        
        const {name, email} = request.body

        const UserRepository = getRepository(User);

        //SELECT * FROM USERS WHERE EMAIL = request.email;
        const userAlreadyExists = await UserRepository.findOne({email})
        
        if(userAlreadyExists){
            return response.status(400).json({message: "User Alread Exists"})
        }

        const user = UserRepository.create({
            name,
            email
        });

        await UserRepository.save(user)
        
        console.log(name)

        return response.send(user)
    }

}

export { UserController }