import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import GetImageDto from './dtos/get-image.dto';
import UploadImageDto from './dtos/upload-image.dto';
import { ImagesService } from './images.service';
import { GetUserDto } from '../user/dtos/get-user-dto';

@UseGuards(AuthGuard('jwt'))
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
    @Body() uploadedImageDto: UploadImageDto,
    @Request() req,
  ): Promise<GetImageDto> {
    const user: GetUserDto = req.user;
    return this.imagesService.uploadImage(uploadedImageDto, user.id, file.path);
  }
}
