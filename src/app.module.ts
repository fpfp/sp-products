import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import {
  RecordNotFoundExceptionFilter,
  SequelizeExceptionFilter,
  validationExceptionFactory,
} from './common/filters';
import { validate } from './common/validations';
import { EnvEnum } from './common/enums';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOSTNAME'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: configService.get<EnvEnum>('NODE_ENV') === EnvEnum.DEVELOPMENT,
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: validationExceptionFactory,
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
    },
    {
      provide: APP_FILTER,
      useClass: SequelizeExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RecordNotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
