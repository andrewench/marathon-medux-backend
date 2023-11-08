import { JwtService } from '@nestjs/jwt'

import { Constants } from '@/constants'

export class TokenService {
  protected static accessToken: string
  protected static refreshToken: string

  protected static accessTokenLifeTime: number =
    Constants.tokens.ACCESS_TOKEN_LIFE_TIME
  protected static refreshTokenLifeTime: number =
    Constants.tokens.REFRESH_TOKEN_LIFE_TIME

  static async generateTokens(jwt: JwtService, payload: Record<string, any>) {
    this.accessToken = await jwt.signAsync(payload, {
      expiresIn: Constants.tokens.ACCESS_TOKEN_LIFE_TIME,
      secret: process.env.AT_SECRET_KEY,
    })

    this.refreshToken = await jwt.signAsync(payload, {
      expiresIn: Constants.tokens.REFRESH_TOKEN_LIFE_TIME,
      secret: process.env.RT_SECRET_KEY,
    })
  }

  protected static async createCookieHeader({
    type,
    path,
  }: {
    type: 'accessToken' | 'refreshToken'
    path: string
  }): Promise<string> {
    const { ACCESS_TOKEN_PREFIX, REFRESH_TOKEN_PREFIX } = Constants.tokens

    const prefix = {
      accessToken: ACCESS_TOKEN_PREFIX,
      refreshToken: REFRESH_TOKEN_PREFIX,
    }

    const lifeTime = {
      accessToken: this.accessTokenLifeTime,
      refreshToken: this.refreshTokenLifeTime,
    }

    const payload: string[] = [
      `${prefix[type]}=${this[type]};`,
      `path=${path};`,
      `expires=${new Date(Date.now() + lifeTime[type])};`,
      `httpOnly=true`,
    ]

    return payload.join(' ')
  }

  public static async generateHeaders() {
    const accessTokenCookieHeader = await this.createCookieHeader({
      type: 'accessToken',
      path: '/',
    })

    const refreshTokenCookieHeader = await this.createCookieHeader({
      type: 'refreshToken',
      path: '/',
    })

    return {
      accessTokenCookieHeader,
      refreshTokenCookieHeader,
    }
  }
}
