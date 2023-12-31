import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { CryptoService, PrismaService, TokenService } from '@/services'

import { Constants } from '@/constants'

import { excludeUnsafeFields, extractTokenFromCookie } from '@/utils'

import { AuthUserDto } from './dto/auth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login({ login, password }: AuthUserDto, response: Response) {
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
      throw new ForbiddenException(Constants.response.INVALID_CREDENTIALS, {
        description: 'INVALID_CREDENTIALS',
      })

    await TokenService.generateTokens(this.jwtService, {
      userId: user.publicId,
      role: user.role,
    })

    const { accessTokenCookieHeader, refreshTokenCookieHeader } =
      TokenService.generateHeaders()

    return response
      .status(200)
      .setHeader('Set-Cookie', [
        accessTokenCookieHeader,
        refreshTokenCookieHeader,
      ])
      .json(excludeUnsafeFields(user, ['publicId', 'password']))
  }

  async signUp(
    { firstName, lastName, login, email, password }: CreateUserDto,
    response: Response,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login,
          },
          {
            email,
          },
        ],
      },
    })

    if (user)
      throw new ForbiddenException(Constants.response.USER_ALREADY_EXIST, {
        description: 'USER_ALREADY_EXIST',
      })

    const hashedPassword = await CryptoService.encrypt(password)

    const hashedId = uuidv4()

    const createdUser = await this.prisma.user.create({
      data: {
        publicId: hashedId,
        firstName,
        lastName,
        login,
        email,
        password: hashedPassword,
      },
    })

    await TokenService.generateTokens(this.jwtService, {
      userId: createdUser.publicId,
      role: Constants.user.DEFAULT_ROLE,
    })

    const { accessTokenCookieHeader, refreshTokenCookieHeader } =
      TokenService.generateHeaders()

    return response
      .status(200)
      .setHeader('Set-Cookie', [
        accessTokenCookieHeader,
        refreshTokenCookieHeader,
      ])
      .json(excludeUnsafeFields(createdUser, ['publicId', 'password']))
  }

  async refresh(request: Request, response: Response) {
    const refreshToken = extractTokenFromCookie({
      request,
      type: 'refreshToken',
    })

    const { userId, role } = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.RT_SECRET_KEY,
      ignoreExpiration: true,
    })

    await TokenService.generateTokens(this.jwtService, {
      userId,
      role,
    })

    const { accessTokenCookieHeader, refreshTokenCookieHeader } =
      TokenService.generateHeaders()

    return response
      .status(200)
      .setHeader('Set-Cookie', [
        accessTokenCookieHeader,
        refreshTokenCookieHeader,
      ])
      .json({})
  }

  async logout(response: Response) {
    const { accessTokenExpiredHeader, refreshTokenExpiredHeader } =
      TokenService.generateExpiredHeaders()

    return response
      .status(200)
      .setHeader('Set-Cookie', [
        accessTokenExpiredHeader,
        refreshTokenExpiredHeader,
      ])
      .json({})
  }
}
