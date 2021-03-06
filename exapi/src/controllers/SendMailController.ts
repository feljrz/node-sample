import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../Services/SendMailService";
import { resolve } from "path";
import { AppError } from "../errors/AppError";

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const SurveyUserRepository = getCustomRepository(SurveysUsersRepository);
    const SurveyRepository = getCustomRepository(SurveysRepository);
    const UserRepository = getCustomRepository(UsersRepository);

    const user = await UserRepository.findOne({ email });
    const survey = await SurveyRepository.findOne({ id: survey_id });

    if (!survey) {
      throw new AppError("Survey does not exists");
    }
    if (!user) {
      throw new AppError("User does not exists");
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };



    const npsPath = resolve(__dirname, "..", "views", "email", "npsMail.hbs");

    const SurveyUserAlreadyExists = await SurveyUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    if (SurveyUserAlreadyExists) {
      variables.id = SurveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.status(200).json(SurveyUserAlreadyExists);
    }

    const surveyUser = SurveyUserRepository.create({
      user_id: user.id,
      survey_id: survey_id,
    });
    await SurveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.status(200).send(surveyUser);
  }
}
export { SendMailController };

