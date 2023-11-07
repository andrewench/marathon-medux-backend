import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

import { Constants } from '@/constants'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromCookie(request)

    if (!token) throw new UnauthorizedException()

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.AT_SECRET_KEY,
      })

      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const cookie = request.headers.cookie

    const cookiesList = cookie.split(/;\s*/)

    let accessToken: string | undefined

    const tokenPatternPrefix = new RegExp(
      `${Constants.ACCESS_TOKEN_PREFIX}=\\w+`,
    )

    cookiesList.forEach(token => {
      if (token.search(tokenPatternPrefix) !== -1) {
        accessToken = token.split('=')[1]
      }
    })

    return accessToken
  }
}
