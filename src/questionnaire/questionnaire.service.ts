import { Injectable, BadRequestException } from '@nestjs/common';
import { PostQuestionnaireDto } from './dtos/post-questionnaire.dto';
import { Questionnaire } from './questionnaire.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetQuestionnaireDto } from './dtos/get-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
    constructor(@InjectModel('Questionnaire') private readonly toQuestionnaireModel: Model<Questionnaire>) { }

    async getImageQuestionnaire(imageId: string, userId: string) {
        return toGetQuestionnaireDto(await this.toQuestionnaireModel.findOne({ imageId, userId }));
    }

    async getUserQuestionnaires(userId: string) {
        return (await this.toQuestionnaireModel.find({userId})).map(toGetQuestionnaireDto);
    }

    async getAllQuestionnaires() {
        return (await this.toQuestionnaireModel.find()).map(toGetQuestionnaireDto);
    }

    async addQuestionnaireAnswer(postQuestionnaireDto: PostQuestionnaireDto, userId: string) {
        if(await this.toQuestionnaireModel.exists({userId, imageId: postQuestionnaireDto.imageId})) {
            const questionnaire = await (await this.toQuestionnaireModel.create({...postQuestionnaireDto, userId})).save();
            return toGetQuestionnaireDto(questionnaire);
        } else {
            throw new BadRequestException('The answers to this questionnaire already exist')
        }
    }
}

function toGetQuestionnaireDto(questionnaire: Questionnaire): GetQuestionnaireDto {
    const { questionOneAnswer, questionTwoAnswer, questionThreeAnswer, questionFourAnswer, questionFiveAnswer, imageId, userId } = questionnaire;
    return {
        imageId,
        questionFiveAnswer,
        questionFourAnswer,
        questionOneAnswer,
        questionThreeAnswer,
        questionTwoAnswer,
        userId
    };
}
