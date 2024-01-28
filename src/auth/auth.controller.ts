import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserDto } from './dto/user.dto';
import { UserService } from './services/user.service';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('signUp')
  @Public()
  register(@Body() newUser: UserDto) {
    return this.userService.create(newUser);
  }
  
  @Post('signIn')
  @Public()
  login(@Body() user: UserDto) {
    return this.authService.signIn(user)
  }

  
}
