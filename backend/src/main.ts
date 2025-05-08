import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as path from 'path';
import * as process from 'node:process';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import validatorFactory from './validator.factory';

config({
  path: path.join(process.cwd(), '.', '.env'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process?.env?.CORS_ORIGIN?.split(','),
    exposedHeaders: ['array-length', 'token'],
    credentials: true,
  });

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validatorFactory,
    }),
  );

  await app.listen(process.env.API_PORT ?? 5132, () => {
    Logger.log(
      `server started on http://localhost:${process.env.API_PORT}/api`,
    );
  });
}
bootstrap();
