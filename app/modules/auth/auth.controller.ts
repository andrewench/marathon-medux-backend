import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { AuthGuard } from '@/guards'

import { AuthUserDto } from './dto/auth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes()
  @Post('/login')
  async login(@Body() credentials: AuthUserDto, @Res() response: Response) {
    return this.authService.login(credentials, response)
  }

  @UsePipes()
  @Put('/signup')
  async signUp(@Body() credentials: CreateUserDto, @Res() response: Response) {
    return this.authService.signUp(credentials, response)
  }

  @Post('/refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    return this.authService.refresh(request, response)
  }

  @Delete('/logout')
  @UseGuards(AuthGuard)
  async logout(@Res() response: Response) {
    return this.authService.logout(response)
  }
}
