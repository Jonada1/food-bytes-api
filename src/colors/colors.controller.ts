import { Controller, Get, Param } from '@nestjs/common';
import { ImagesService } from '../images/images.service';
import Vibrant = require('node-vibrant');
@Controller('colors')
export class ColorsController {
  constructor(private readonly imageService: ImagesService) {}
  @Get(':id')
  public async getColors(@Param('id') id: string) {
    const url = await (await this.imageService.getById(id)).url;
    const palette = await Vibrant.from(url).getPalette();
    const paletteOrdered = [
      palette.DarkMuted,
      palette.DarkVibrant,
      palette.LightMuted,
      palette.LightVibrant,
      palette.Muted,
      palette.Vibrant
    ].sort((palette1, palette2) => palette2.population - palette1.population);
    return paletteOrdered;
  }
}
