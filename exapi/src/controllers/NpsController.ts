import { Request, Response } from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

class NpsController{
    async execute(request: Request, response: Response){
        const { survey_id } = request.params

        const SurveyUserRepository = getCustomRepository(SurveysUsersRepository)

        const surveysUsers = await SurveyUserRepository.find({
            survey_id,
            value: Not(IsNull())    
        })

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length 

        const promoter = surveysUsers.filter(
            (survey) => survey.value >=9 && survey.value <= 10
        ).length 
        
        const totalAnswers = surveysUsers.length
        const passive = totalAnswers - (promoter + detractor)

        const score = Number((((promoter - detractor)/totalAnswers)* 100).toFixed(2) )
        
        return response.status(200).json({
            detractor,
            promoter,
            passive,
            score
        })

    }

}

export { NpsController }