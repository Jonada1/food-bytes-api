import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { GetUserDto } from '../user/dtos/get-user-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'SWct5ndcC8XCwGX87yKOKJe/N+FOLGHAYHmZk4gqQeM/otZpts8qnC+em06iosuQhbdEv8azE9HEfv96oVgTa3nDTJUn9pDqcBX8vO7D809z6/5AA6TwsuEcwekRDnwQnQ+er0T6X9s1QYRFMY8JQ9KWCAoPnzpq0Clg+U9hfUjYJB5KT6a72AoDO/HXkzCM+FBEYkjfrvOk2Avq2uGtZru6akPSBRTpJlAHxp6If1pGqNuaqP6ENkBHHelIXr7+4czWE6uGouzfyDU9zgubRURmenfTndoat9b+ZJAbltijKtEdTZsCcFXz+GRbB9SEthxG90hJo6lpDFvkdoTTZQ==',
    });
  }

  async validate(payload: GetUserDto, done: Function) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      const validClaims = await this.authService.verifyTokenClaims(payload);

      if (!validClaims)
        return done(new UnauthorizedException('invalid token claims'), false);

      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}
