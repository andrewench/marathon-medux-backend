import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

import { CryptoService, PrismaService, TokenService } from '@/services'

import { Constants } from '@/constants'

import { excludeUnsafeFields } from '@/utils'

import { AuthUserDto } from './dto/auth-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login({ login, password }: AuthUserDto, res: Response) {
    const user = await this.prisma.user.findFirst({
      where: {
        login,
      },
    })

    if (!user)
      throw new NotFoundException(Constants.response.USER_NOT_FOUND, {
        description: 'USER_NOT_FOUND',
      })

    const isVerifiedPassword = await CryptoService.verify(
      user.password,
      password,
    )

    if (!isVerifiedPassword)
      throw new ForbiddenException(Constants.response.INVALID_CREDENTIALS)

    await TokenService.generateTokens(this.jwtService, {
      id: user.id,
      role: Constants.user.DEFAULT_ROLE,
    })

    const { accessTokenCookieHeader, refreshTokenCookieHeader } =
      await TokenService.generateHeaders()

    return res
      .status(200)
      .setHeader('Set-Cookie', [
        accessTokenCookieHeader,
        refreshTokenCookieHeader,
      ])
      .json(excludeUnsafeFields(user, ['password']))
  }
}
