import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.getHttpAdapter().getInstance().disable('x-powered-by')
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: process.env.CLIENT_HOST,
  })
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.SERVER_PORT)
}

bootstrap()
