import { Document } from 'mongoose';
import { GetPaletteDto } from '../../colors/dto/get-image-palette.dto';

export interface Image extends Document {
  text: string;
  url: string;
  userId: string;
  colors: GetPaletteDto[],
}
