import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user-dto';
import { GetUserDto } from './dtos/get-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly toUserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.toUserModel(createUserDto);
    return createUser.save();
  }

  async getAll(): Promise<GetUserDto[]> {
    return (await this.toUserModel.find().exec()).map(mapToGetUserDto);
  }
}

function mapToGetUserDto(user: User): GetUserDto {
  return {
    id: user.id,
    name: user.name
  };
}
