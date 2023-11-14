import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

import { Constants } from '@/constants'

const { patterns } = Constants

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Matches(patterns.LOGIN_PATTERN, {
    message:
      'login must contain only alphanumeric characters, _ and start with a letter',
  })
  login: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @Matches(patterns.PASSWORD_PATTERN, {
    message:
      'password must contain special characters: #?!@$%^&* - and it have a length of at least 8 characters',
  })
  password: string
}
