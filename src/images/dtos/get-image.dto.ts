import { GetPaletteDto } from "../../colors/dto/get-image-palette.dto";

export default interface GetImageDto {
  id: string;
  text: string;
  url: string;
  colors: GetPaletteDto[],
  date: Date,
}
