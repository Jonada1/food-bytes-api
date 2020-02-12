import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorsService } from '../colors/colors.service';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    QuestionnaireModule
  ],
  providers: [ImagesService, ColorsService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
