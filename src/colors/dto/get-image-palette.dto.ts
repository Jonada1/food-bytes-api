import GetImageDto from '../../images/dtos/get-image.dto';
import { Vec3 } from 'node-vibrant/lib/color';

export interface GetImagePaletteDto extends GetImageDto {
  palettes: GetPaletteDto[],
}

export interface GetPaletteDto {
    rgb: Vec3;
    population: number;
}