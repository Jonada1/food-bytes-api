import { Module } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { QuestionnaireService } from 'src/questionnaire/questionnaire.service';

@Module({
  imports: [],
  providers: [ImagesService, QuestionnaireService],
  controllers: [],
  exports: [],
})
export class ExtractionModule {}
