import { Request } from 'express'

export interface IExtractTokenFromCookie {
  request: Request
  type: 'accessToken' | 'refreshToken'
}
