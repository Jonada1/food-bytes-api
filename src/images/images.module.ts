import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])],
  providers: [ImagesService],
  controllers: [ImagesController]
})
export class ImagesModule {}
