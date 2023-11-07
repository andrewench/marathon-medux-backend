import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthUserDto } from './dto/auth-user.dto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(credentials: AuthUserDto) {
    return credentials
  }
}
