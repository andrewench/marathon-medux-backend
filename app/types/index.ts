export type TTokenType = 'accessToken' | 'refreshToken'

export type TJwtPayload = {
  id: number
  role: string
  iat: number
  exp: number
}
