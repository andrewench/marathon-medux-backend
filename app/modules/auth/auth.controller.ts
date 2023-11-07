import { Body, Controller, Post } from '@nestjs/common'

import { AuthUserDto } from './dto/auth-user.dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() credentials: AuthUserDto) {
    return this.authService.login(credentials)
  }
}
