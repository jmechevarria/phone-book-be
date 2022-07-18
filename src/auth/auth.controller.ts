import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { SignupDTO } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDTO, @Session() session) {
    const user = await this.authService.signup(body);
    session.userId = user.id;

    return {
      name: user.name,
      email: user.email,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDTO, @Session() session) {
    const user = await this.authService.login(body);
    session.userId = user.id;

    return {
      name: user.name,
      email: user.email,
    };
  }

  @Post('logout')
  async logout(@Session() session: any) {
    session.userId = undefined;
  }
}
