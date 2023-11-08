import { UnauthorizedException } from '@nestjs/common'

import { Constants } from '@/constants'

import { IExtractTokenFromCookie } from './extract-token-from-cookie.interface'

export const extractTokenFromCookie = ({
  request,
  type,
}: IExtractTokenFromCookie): string | undefined => {
  const cookie = request.headers.cookie

  if (!cookie) throw new UnauthorizedException()

  const cookiesList = cookie.split(/;\s*/)

  let extractedToken: string | undefined

  const tokenPrefix =
    type === 'accessToken'
      ? Constants.tokens.ACCESS_TOKEN_PREFIX
      : Constants.tokens.REFRESH_TOKEN_PREFIX

  const tokenPatternPrefix = new RegExp(`${tokenPrefix}=\\w+`)

  cookiesList.forEach(token => {
    if (token.search(tokenPatternPrefix) !== -1) {
      extractedToken = token.split('=')[1]
    }
  })

  return extractedToken
}
