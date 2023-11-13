export type TTokenType = 'accessToken' | 'refreshToken'

export type TJwtPayload = {
  userId: number
  role: string
  iat: number
  exp: number
}
