import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class AnswerController{
    async execute(request: Request, response: Response){
        const { value } = request.params
        const { u } = request.query

        const SurveyUserRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await SurveyUserRepository.findOne({
            id: String(u)
        });

        if(!surveyUser){
            throw new AppError("Survey User does not exists")
        }
        
        surveyUser.value = Number(value); //Necessário realizar o cast pois o valor por padrão é undefined

        await SurveyUserRepository.save(surveyUser)

        return response.status(200).send(surveyUser);
    }
}

export { AnswerController }