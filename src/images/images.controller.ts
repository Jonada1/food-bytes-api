import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Req,
  Delete,
  Param,
  BadRequestException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiNoContentResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import GetImageDto from './dtos/get-image.dto';
import UploadImageDto from './dtos/upload-image.dto';
import { ImagesService } from './images.service';
import { GetUserDto } from '../user/dtos/get-user-dto';
import { Response } from 'express';

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
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile() file: any,
    @Body() uploadedImageDto: UploadImageDto,
    @Request() req,
  ): Promise<GetImageDto> {
    const user: GetUserDto = req.user;
    const image = await this.imagesService.uploadImage(
      uploadedImageDto,
      user.id,
      file.path,
    );
    return image;
  }

  @Get('without-questionnaire')
  async getImagesWithoutQuestionnaires(@Req() req) {
    const user = req.user;
    return this.imagesService.getImagesWithoutQuestionnaires(user.id);
  }
  
  @Get('with-questionnaire')
  async getImagesWithQuestionnaires(@Req() req) {
    const user = req.user;
    return this.imagesService.getImagesWithQuestionnaires(user.id);
  }

  @Delete(':imageId')
  async delete(
    @Req() req,
    @Res() res: Response,
    @Param('imageId') imageId: string,
  ) {
    const user = req.user;
    if (!(await this.imagesService.isImageOfUser(imageId, user.id))) {
      throw new BadRequestException('You cannot delete another users image');
    }
    await this.imagesService.deleteImage(imageId);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
