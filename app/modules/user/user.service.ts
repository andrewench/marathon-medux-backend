import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { PrismaService } from '@/services'

import { excludeUnsafeFields } from '@/utils'

import { TJwtPayload } from '@/types'

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async getProfile(request: Request) {
    const { id, role } = request['user'] as TJwtPayload

    const user = await this.prisma.user.findFirst({
      where: {
        id,
        role,
      },
    })

    if (!user) throw new UnauthorizedException()

    return excludeUnsafeFields(user, ['password'])
  }
}
