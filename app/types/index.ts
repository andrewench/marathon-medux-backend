export type TTokenType = 'accessToken' | 'refreshToken'

export type TJwtPayload = {
  userId: string
  role: string
  iat: number
  exp: number
}
