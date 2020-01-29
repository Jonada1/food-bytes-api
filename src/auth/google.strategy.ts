import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      clientID:
        '32768833798-4vu5nu3t65tp1fqb73fs3hihmbd4o072.apps.googleusercontent.com', // <- Replace this with your client id
      clientSecret: 'tEcUFv5J_mlc3DsBOs7p94AO', // <- Replace this with your client secret
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile']
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: { id: string; displayName: string },
    done: Function
  ) {
    try {
      const jwt: string = await this.authService.validateOAuthLogin(
        profile,
        Provider.GOOGLE
      );
      const user = {
        jwt
      };

      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  }
}
