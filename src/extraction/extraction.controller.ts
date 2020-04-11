import { Controller, Get } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { UserService } from 'src/user/user.service';

@Controller('extraction')
export class ExtractionController {
  constructor(private imagesService: ImagesService, private userService: UserService) {}
  
  @Get('')
  async getImagesWithQuestionnaires() {
    const users = await this.userService.getAll();
    const usersTotal: {[key: string]: {questionnaires: any[]; meals: any[], user: any}} = {};
    for(const user of users) {
      usersTotal[user.id] = {questionnaires: [], meals: [], user};
      usersTotal[user.id].questionnaires = await this.imagesService.getImagesWithQuestionnaires(user.id);
      usersTotal[user.id].meals = await this.imagesService.getMealsPerDay(user.id);
    };
    return usersTotal;
  }
}
