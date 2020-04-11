import { Module } from '@nestjs/common';
import { ImagesModule } from 'src/images/images.module';
import { ImagesService } from 'src/images/images.service';
import { QuestionnaireController } from 'src/questionnaire/questionnaire.controller';
import { QuestionnaireModule } from 'src/questionnaire/questionnaire.module';
import { QuestionnaireService } from 'src/questionnaire/questionnaire.service';

@Module({
  imports: [QuestionnaireModule, ImagesModule],
  providers: [],
  controllers: [QuestionnaireController],
  exports: [],
})
export class ExtractionModule {}
