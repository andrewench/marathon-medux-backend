import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  login: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string
}
