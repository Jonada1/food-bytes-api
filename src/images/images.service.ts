import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import GetImageDto from './dtos/get-image.dto';
import UploadImageDto from './dtos/upload-image.dto';
import { Model } from 'mongoose';
import { Image } from './interfaces/image.interface';
import { ColorsService } from '../colors/colors.service';
import Vibrant = require('node-vibrant');
@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly toImageModel: Model<Image>,
    private readonly colorService: ColorsService,
  ) {}

  public async uploadImage(
    uploadImageDto: UploadImageDto,
    userId: string,
    url: string,
  ): Promise<GetImageDto> {
    if (!userId) {
      throw new Error('User Id was not provided');
    }
    
    const palette = await Vibrant.from(url).getPalette();
    const colors = this.colorService.orderAndMapPaletteColors(palette);
    const uploadedImage = await new this.toImageModel({
      ...uploadImageDto,
      userId,
      url,
      colors,
    }).save();
    return toGetImageDto(uploadedImage);
  }

  public async isImageOfUser(imageId: string, userId: string) {
    return (await this.toImageModel.findById(imageId)).userId === userId;
  }

  public async getById(id: string): Promise<GetImageDto> {
    return toGetImageDto(await this.toImageModel.findById(id));
  }

  public async getByUserId(userId: string) {
    return (await this.toImageModel.find({ userId })).map(toGetImageDto);
  }

  public async getAll(): Promise<GetImageDto[]> {
    return (await this.toImageModel.find()).map(toGetImageDto);
  }
}

export function toGetImageDto(image: Image): GetImageDto {
  return {
    id: image._id,
    text: image.text,
    url: image.url,
    colors: image.colors,
  };
}
