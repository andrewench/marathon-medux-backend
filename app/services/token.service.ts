import { JwtService } from '@nestjs/jwt'

import { Constants } from '@/constants'

import { TTokenType } from '@/types'

const {
  ACCESS_TOKEN_PREFIX,
  ACCESS_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_PREFIX,
  REFRESH_TOKEN_LIFE_TIME,
} = Constants.tokens

export class TokenService {
  protected static accessToken: string
  protected static refreshToken: string

  protected static accessTokenLifeTime: number = ACCESS_TOKEN_LIFE_TIME
  protected static refreshTokenLifeTime: number = REFRESH_TOKEN_LIFE_TIME

  protected static prefixList = {
    accessToken: ACCESS_TOKEN_PREFIX,
    refreshToken: REFRESH_TOKEN_PREFIX,
  }

  public static async generateTokens(
    jwt: JwtService,
    payload: Record<string, any>,
  ) {
    this.accessToken = await jwt.signAsync(payload, {
      expiresIn: Constants.tokens.ACCESS_TOKEN_LIFE_TIME,
      secret: process.env.AT_SECRET_KEY,
    })

    this.refreshToken = await jwt.signAsync(payload, {
      expiresIn: Constants.tokens.REFRESH_TOKEN_LIFE_TIME,
      secret: process.env.RT_SECRET_KEY,
    })
  }

  protected static createCookieHeader({
    type,
    path,
  }: {
    type: TTokenType
    path: string
  }): string {
    const lifeTime = {
      accessToken: this.accessTokenLifeTime,
      refreshToken: this.refreshTokenLifeTime,
    }

    const payload: string[] = [
      `${this.prefixList[type]}=${this[type]};`,
      `path=${path};`,
      `expires=${new Date(Date.now() + 1000 * lifeTime[type])};`,
      `httpOnly=true`,
      `domain=${process.env.DOMAIN_NAME}`,
    ]

    return payload.join(' ')
  }

  protected static createExpiredCookieHeader({
    type,
  }: {
    type: TTokenType
  }): string {
    const payload = [
      `${this.prefixList[type]}=;`,
      'path=/;',
      `expires=${Constants.tokens.EXPIRED_DATE};`,
      'httpOnly=true;',
      `domain=${process.env.DOMAIN_NAME}`,
    ]

    return payload.join(' ').trim()
  }

  public static generateHeaders() {
    const accessTokenCookieHeader = this.createCookieHeader({
      type: 'accessToken',
      path: '/',
    })

    const refreshTokenCookieHeader = this.createCookieHeader({
      type: 'refreshToken',
      path: '/',
    })

    return {
      accessTokenCookieHeader,
      refreshTokenCookieHeader,
    }
  }

  public static generateExpiredHeaders() {
    const accessTokenExpiredHeader = this.createExpiredCookieHeader({
      type: 'accessToken',
    })

    const refreshTokenExpiredHeader = this.createExpiredCookieHeader({
      type: 'refreshToken',
    })

    return {
      accessTokenExpiredHeader,
      refreshTokenExpiredHeader,
    }
  }
}
