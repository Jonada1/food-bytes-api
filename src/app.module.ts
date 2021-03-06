import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { UserModule } from './user/user.module';
import { ColorsModule } from './colors/colors.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { ExtractionModule } from './extraction/extraction.module';
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/food-bytes'),
    UserModule,
    ImagesModule,
    ColorsModule,
    QuestionnaireModule,
    ExtractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
