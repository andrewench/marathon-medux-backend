import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { PrismaService } from '@/services'

import { UserController } from './user.controller'

import { UserService } from './user.service'

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
