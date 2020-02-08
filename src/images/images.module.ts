import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';
import { ColorsModule } from '../colors/colors.module';
import { ColorsService } from '../colors/colors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  providers: [ImagesService, ColorsService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
