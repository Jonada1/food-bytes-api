import { Controller, Get, Req } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { UserService } from 'src/user/user.service';
import { QuestionnaireService } from 'src/questionnaire/questionnaire.service';

@Controller('extraction')
export class ExtractionController {
  constructor(private imagesService: ImagesService, private userService: UserService) {}
  
  @Get('')
  async getImagesWithQuestionnaires() {
    const users = this.userService.getAll();
    const usersTotal: {[key: string]: {questionnaires: any[]; meals: any[]}} = {};
    await (await users).forEach(async user => {
      usersTotal[user.id].questionnaires = await this.imagesService.getImagesWithQuestionnaires(user.id);
      usersTotal[user.id].meals = await this.imagesService.getMealsPerDay(user.id);
    });
    return usersTotal;
  }
}
