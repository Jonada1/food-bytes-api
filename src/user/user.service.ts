import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly toUserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.toUserModel(createUserDto);
    return createUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.toUserModel.find().exec();
  }
}