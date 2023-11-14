import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

import { Constants } from '@/constants'

const { patterns } = Constants

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(28)
  @Matches(patterns.FIRST_NAME_PATTERN, {
    message: 'firstName must contain only alphabetic characters',
  })
  firstName: string

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(patterns.LAST_NAME_PATTERN, {
    message: 'lastName must contain only alphabetic characters',
  })
  lastName: string

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Matches(patterns.LOGIN_PATTERN, {
    message:
      'login must contain only alphanumeric characters, _ and start with a letter',
  })
  login: string

  @Matches(patterns.EMAIL_PATTERN, {
    message: 'invalid email format',
  })
  email: string

  @IsString()
  @MaxLength(32)
  @Matches(patterns.PASSWORD_PATTERN, {
    message:
      'password must contain special characters: #?!@$%^&* - and it have a length of at least 8 characters',
  })
  password: string
}
