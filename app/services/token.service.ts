import { JwtService } from '@nestjs/jwt'

import { Constants } from '@/constants'

export class TokenService {
  protected static accessToken: string
  protected static refreshToken: string

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
    expires,
  }: {
    type: 'accessToken' | 'refreshToken'
    path: string
    expires: number
  }): Promise<string> {
    const { ACCESS_TOKEN_PREFIX, REFRESH_TOKEN_PREFIX } = Constants.tokens

    const prefix = {
      accessToken: ACCESS_TOKEN_PREFIX,
      refreshToken: REFRESH_TOKEN_PREFIX,
    }

    const attributes: string[] = [
      `${prefix[type]}=${this[type]};`,
      `path=${path};`,
      `expires=${new Date(Date.now() + expires)};`,
      `httpOnly=true`,
    ]

    return attributes.join(' ')
  }

  public static async generateHeaders() {
    const { ACCESS_TOKEN_LIFE_TIME, REFRESH_TOKEN_LIFE_TIME } = Constants.tokens

    const accessTokenCookieHeader = await this.createCookieHeader({
      type: 'accessToken',
      path: '/',
      expires: ACCESS_TOKEN_LIFE_TIME,
    })

    const refreshTokenCookieHeader = await this.createCookieHeader({
      type: 'refreshToken',
      path: '/',
      expires: REFRESH_TOKEN_LIFE_TIME,
    })

    return {
      accessTokenCookieHeader,
      refreshTokenCookieHeader,
    }
  }
}
