import { Injectable } from '@nestjs/common';
import { Palette } from 'node-vibrant/lib/color';
import GetImageDto from '../images/dtos/get-image.dto';
import { GetImagePaletteDto, GetPaletteDto } from './dto/get-image-palette.dto';

@Injectable()
export class ColorsService {

    orderAndMapPaletteColorsWithImage(
        palette: Palette,
        image: GetImageDto,
    ): GetImagePaletteDto {
        const palettes: GetPaletteDto[] = [
            palette.DarkMuted,
            palette.DarkVibrant,
            palette.LightMuted,
            palette.LightVibrant,
            palette.Muted,
            palette.Vibrant,
        ]
            .sort((palette1, palette2) => palette2.population - palette1.population)
            .map(x => ({ rgb: x.rgb, population: x.population }));
        return {
            ...image,
            palettes,
        };
    }

    orderAndMapPaletteColors(
        palette: Palette,
    ): GetPaletteDto[] {
        const palettes: GetPaletteDto[] = [
            palette.DarkMuted,
            palette.DarkVibrant,
            palette.LightMuted,
            palette.LightVibrant,
            palette.Muted,
            palette.Vibrant,
        ]
            .sort((palette1, palette2) => palette2.population - palette1.population)
            .map(x => ({ rgb: x.rgb, population: x.population }));
        return palettes;
    }
}
