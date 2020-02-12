import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireSchema } from './schema/questionnaire.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Questionnaire', schema: QuestionnaireSchema }]),
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
  exports: [QuestionnaireService],
})
export class QuestionnaireModule {}
