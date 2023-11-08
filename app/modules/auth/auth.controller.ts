import { Body, Controller, Post, Put, Req, Res, UsePipes } from '@nestjs/common'
import { Request, Response } from 'express'

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

  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.refresh(req, res)
  }
}
