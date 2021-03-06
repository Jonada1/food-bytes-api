import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('https://food-bytes.com/login/' + jwt);
    else res.redirect('https://food-bytes.com/login/failure');
  }

  @Get('isLoggedIn')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return true;
  }
}
