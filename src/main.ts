import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); //helps protect the app from some well-known web vulnerabilities by setting HTTP headers appropriately

  await app.listen(new ConfigService().get('PORT'));
}
bootstrap();
