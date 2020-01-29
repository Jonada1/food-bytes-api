import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException
} from '@nestjs/common';
import { ImagesService } from '../images/images.service';
import Vibrant = require('node-vibrant');
import { AuthGuard } from '@nestjs/passport';
import { Palette } from 'node-vibrant/lib/color';
import GetImageDto from '../images/dtos/get-image.dto';
import { GetImagePaletteDto } from './dto/get-image-palette.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('colors')
export class ColorsController {
  constructor(private readonly imageService: ImagesService) {}
  @Get(':id')
  public async getColors(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    if (!(await this.imageService.isImageOfUser(id, userId))) {
      throw new UnauthorizedException(
        'unauthorized',
        "This image doesn't belong to the user"
      );
    }
    const image = await this.imageService.getById(id);
    const palette = await Vibrant.from(image.url).getPalette();
    return orderAndMapPaletteColors(palette, image);
  }

  @Get()
  public async getAllImageColorsForUser(@Request() req) {
    const userId = req.user.id;
    const imagePalettes = (await this.imageService.getByUserId(userId)).map(
      async image => orderAndMapPaletteColors(await Vibrant.from(image.url).getPalette(), image),
    );
    return imagePalettes
  }
}

function orderAndMapPaletteColors(
  palette: Palette,
  image: GetImageDto
): GetImagePaletteDto[] {
  return [
    palette.DarkMuted,
    palette.DarkVibrant,
    palette.LightMuted,
    palette.LightVibrant,
    palette.Muted,
    palette.Vibrant
  ]
    .sort((palette1, palette2) => palette2.population - palette1.population)
    .map(x => ({ rgb: x.rgb, population: x.population, ...image }));
}
