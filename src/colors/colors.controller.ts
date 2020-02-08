import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ImagesService } from '../images/images.service';
import Vibrant = require('node-vibrant');
import { AuthGuard } from '@nestjs/passport';
import { Palette } from 'node-vibrant/lib/color';
import GetImageDto from '../images/dtos/get-image.dto';
import { GetImagePaletteDto, GetPaletteDto } from './dto/get-image-palette.dto';
import { ColorsService } from './colors.service';
@UseGuards(AuthGuard('jwt'))
@Controller('colors')
export class ColorsController {
  constructor(private readonly imageService: ImagesService, private readonly colorsService: ColorsService) {}
  @Get(':id')
  public async getColors(
    @Param('id') id: string,
    @Request() req,
  ): Promise<GetImagePaletteDto> {
    const userId = req.user.id;
    if (!(await this.imageService.isImageOfUser(id, userId))) {
      throw new UnauthorizedException(
        'unauthorized',
        "This image doesn't belong to the user",
      );
    }
    const image = await this.imageService.getById(id);
    const palette = await Vibrant.from(image.url).getPalette();
    return this.colorsService.orderAndMapPaletteColorsWithImage(palette, image);
  }

  @Get()
  public async getAllImageColorsForUser(
    @Request() req,
  ): Promise<GetImagePaletteDto[]> {
    const userId = req.user.id;
    const images = await this.imageService.getByUserId(userId);

    const imagePalettes = await Promise.all(
      images.map(async image =>
        this.colorsService.orderAndMapPaletteColorsWithImage(
          await Vibrant.from(image.url).getPalette(),
          image,
        ),
      ),
    );
    return imagePalettes;
  }
}


