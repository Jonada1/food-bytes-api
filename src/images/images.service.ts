import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import GetImageDto from './dtos/get-image.dto';
import UploadImageDto from './dtos/upload-image.dto';
import { Model } from 'mongoose';
import { Image } from './interfaces/image.interface';
@Injectable()
export class ImagesService {
  constructor(
    @InjectModel('Image') private readonly toImageModel: Model<Image>
  ) {}
  
  public async uploadImage(
    uploadImageDto: UploadImageDto,
    url: string
  ): Promise<GetImageDto> {
    const uploadedImage = await new this.toImageModel({
      ...uploadImageDto,
      url
    }).save();
    return {
      id: uploadedImage._id,
      text: uploadedImage.text,
      url: uploadedImage.url
    };
  }

  public async getById(id: string) {
    return this.toImageModel.findById(id);
  }
}
