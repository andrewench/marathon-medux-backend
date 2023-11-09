import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { AuthGuard } from '@/guards'

import { UserService } from './user.service'

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: Request) {
    return this.userService.getProfile(request)
  }
}
