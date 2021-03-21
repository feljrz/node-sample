import { Request, Response } from 'express'
import { getRepository, getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup'
import { AppError } from '../errors/AppError';


class UserController {
    async create(request: Request, response: Response){
        
        const { name, email } = request.body

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        const validateParams = await schema.isValid(request.body);

        // if(!validateParams){
        //     return response.status(400).json({error: "Validation Failed"})
        // }

        //abortEarly não para na primeira validação
        try{
            await schema.validate(request.body, {abortEarly: false})
        }
        catch(err){
            throw new AppError(err)
        }


        const UserRepository = getCustomRepository(UsersRepository)

        //SELECT * FROM USERS WHERE EMAIL = request.email;
        const userAlreadyExists = await UserRepository.findOne({email})
        
        if(userAlreadyExists){
            throw new AppError("User already exists")
        }

        const user = UserRepository.create({
            name,
            email
        });

        await UserRepository.save(user)
        
        console.log(name)

        return response.status(201).send(user)
    }

    async show(request: Request, response: Response){
        const UserRepository = getCustomRepository(UsersRepository)
        const users = await UserRepository.find()
        
        return response.status(200).send(users);
    }
}

export { UserController }