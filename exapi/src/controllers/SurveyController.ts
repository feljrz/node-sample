import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { Request, Response} from 'express';

class SurveyController{
    async create(request: Request, response: Response){
        
        const { title, description } = request.body;

        const SurveyRepository = getCustomRepository(SurveysRepository);

        const survey = SurveyRepository.create(
            {
                title: title,
                description: description
            }
        )

        await SurveyRepository.save(survey)

        return response.status(201).json(survey)

    }

    async show(request: Request, response: Response){
        const SurveyRepository = getCustomRepository(SurveysRepository);

        const surveys = await SurveyRepository.find()
        console.log(surveys)

        return response.status(200).json(surveys)

    }

}

export { SurveyController }