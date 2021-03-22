import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { Request, Response } from "express";
import * as yup from "yup";

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });

    const validateParams = await schema.isValid(request.body);

    const SurveyRepository = getCustomRepository(SurveysRepository);

    const survey = SurveyRepository.create({
      title: title,
      description: description,
    });

    await SurveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const SurveyRepository = getCustomRepository(SurveysRepository);

    const surveys = await SurveyRepository.find();
    return response.status(200).json(surveys);
  }
}

export { SurveyController };
