import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { https } from 'firebase-functions';
import { AppModule } from './app.module';

const server = express();

export const createNestServer = async (expressInstance) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {}
  );

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest Boilerplate API')
    .setDescription('Nest API for firebase storage and auth')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  return app.init();
};

createNestServer(server)
  .then(() => {
    console.log('Nest Ready');
  })
  .catch((err) => console.error('Nest broken', err));

export const api = https.onRequest(server);
