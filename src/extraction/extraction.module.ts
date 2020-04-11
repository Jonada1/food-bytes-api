import { Module } from '@nestjs/common';
import { ImagesModule } from 'src/images/images.module';
import { ImagesService } from 'src/images/images.service';
import { QuestionnaireController } from 'src/questionnaire/questionnaire.controller';
import { QuestionnaireModule } from 'src/questionnaire/questionnaire.module';
import { QuestionnaireService } from 'src/questionnaire/questionnaire.service';
import { ExtractionController } from './extraction.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ImagesModule, UserModule],
  providers: [],
  controllers: [ExtractionController],
  exports: [],
})
export class ExtractionModule {}
