import {
  Controller,
  UseInterceptors,
  Post,
  UploadedFile,
  Body
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import UploadImageDto from './dtos/upload-image.dto';
import { json } from 'express';
import GetImageDto from './dtos/get-image.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    })
  )
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile() file: any,
    @Body() uploadedImageDto: UploadImageDto
  ): Promise<GetImageDto> {
    return this.imagesService.uploadImage(uploadedImageDto, file.path);
  }
}
