import { Body, Controller, Post, Req, Get, UseGuards, Param } from '@nestjs/common';
import { PostQuestionnaireDto } from './dtos/post-questionnaire.dto';
import { QuestionnaireService } from './questionnaire.service';
import { GetUserDto } from '../user/dtos/get-user-dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('questionnaire')
export class QuestionnaireController {
    constructor(private questionnaireService: QuestionnaireService) { }
    @Post()
    public async addQuestionnaire(
        @Req() req,
        @Body() postQuestionnaireDto: PostQuestionnaireDto
    ) {
        const user: GetUserDto = req.user;
        return this.questionnaireService.addQuestionnaireAnswer(postQuestionnaireDto, user.id);
    }

    @Get()
    public async getQuestionnaires() {
        return this.questionnaireService.getAllQuestionnaires();
    }

    @Get('user')
    public async getUserQuestionnaires(@Req() req) {
        const user: GetUserDto = req.user;
        return this.questionnaireService.getUserQuestionnaires(user.id);
    }

    @Get('image/:imageId')
    public async getImageQuestionnaire(@Req() req, @Param('imageId') imageId) {
        const user: GetUserDto = req.user;
        return this.questionnaireService.getImageQuestionnaire(imageId, user.id)
    }
}
