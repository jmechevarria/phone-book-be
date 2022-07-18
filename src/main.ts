import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); //helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(
    cookieSession({
      keys: ['f9839s8zcn23'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(new ConfigService().get('PORT'));
}
bootstrap();
