import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ImagesService } from '../images/images.service';
import { GetUserDto } from './dtos/get-user-dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Get('current')
  async getLoggedUser(@Request() req) {
    return req.user;
  }
  
  @Get('images')
  async getUserImages(@Request() req) {
    const user: GetUserDto = req.user;
    return this.imagesService.getByUserId(user.id);
  }
}
