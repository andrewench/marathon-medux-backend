import { hash, verify } from 'argon2'

export class CryptoService {
  public static async encrypt(password: string) {
    return await hash(password)
  }

  public static async verify(hash: string, original: string) {
    return verify(hash, original)
  }
}
