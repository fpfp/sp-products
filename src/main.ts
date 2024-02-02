import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    credentials: true,
  });

  await app.listen(configService.get<number>('PORT'));
  const logger = new Logger('bootstrap');
  logger.log(`Listening on ${await app.getUrl()}`);
}
bootstrap();
