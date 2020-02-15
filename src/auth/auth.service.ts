import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { GetUserDto } from '../user/dtos/get-user-dto';
import { UserService } from '../user/user.service';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY =
    'SWct5ndcC8XCwGX87yKOKJe/N+FOLGHAYHmZk4gqQeM/otZpts8qnC+em06iosuQhbdEv8azE9HEfv96oVgTa3nDTJUn9pDqcBX8vO7D809z6/5AA6TwsuEcwekRDnwQnQ+er0T6X9s1QYRFMY8JQ9KWCAoPnzpq0Clg+U9hfUjYJB5KT6a72AoDO/HXkzCM+FBEYkjfrvOk2Avq2uGtZru6akPSBRTpJlAHxp6If1pGqNuaqP6ENkBHHelIXr7+4czWE6uGouzfyDU9zgubRURmenfTndoat9b+ZJAbltijKtEdTZsCcFXz+GRbB9SEthxG90hJo6lpDFvkdoTTZQ=='; // <- replace this with your secret key

  constructor(private usersService: UserService) {}

  public verifyTokenClaims(_payload: GetUserDto): boolean {
    return true;
  }

  async validateOAuthLogin(
    profile: { id: string; displayName: string },
    provider: Provider,
  ): Promise<string> {
    try {
      //   You can add some registration logic here,
      //   to register the user using their thirdPartyId (in this case their googleId)
      let user: GetUserDto = null; //await this.usersService.findOne(profile.id);

      if (!user) {
        user = await this.usersService.create({
          id: profile.id,
          name: profile.displayName,
        });
      }

      const payload = {
        ...user,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
