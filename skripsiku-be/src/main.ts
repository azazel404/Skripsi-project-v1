import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import fmp from 'fastify-multipart';

async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter({
  //     logger: false,
  //   })
  // );

 const app = await NestFactory.create(AppModule, { cors: true });

  // app.register(fmp);

  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Skripsiku API Documentation')
    .setDescription('API Documentation')
    .setVersion('v1')
    .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PROXY_PORT, '0.0.0.0');
}
bootstrap();
