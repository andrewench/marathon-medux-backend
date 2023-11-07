import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common'
import { Response } from 'express'

import { AuthUserDto } from './dto/auth-user.dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes()
  @Post('/login')
  async login(@Body() credentials: AuthUserDto, @Res() res: Response) {
    return this.authService.login(credentials, res)
  }
}
