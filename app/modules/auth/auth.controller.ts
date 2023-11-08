import { Body, Controller, Post, Put, Res, UsePipes } from '@nestjs/common'
import { Response } from 'express'

import { AuthUserDto } from './dto/auth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes()
  @Post('/login')
  async login(@Body() credentials: AuthUserDto, @Res() res: Response) {
    return this.authService.login(credentials, res)
  }

  @UsePipes()
  @Put('/signup')
  async signUp(@Body() credentials: CreateUserDto, @Res() res: Response) {
    return this.authService.signUp(credentials, res)
  }
}
