import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  login: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string
}
