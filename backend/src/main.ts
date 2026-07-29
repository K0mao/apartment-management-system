import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3001',
    Credential: true,
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const config = new DocumentBuilder()
  .setTitle('Apartment Management API')
  .setDescription('API documentation for Apartment Management System')
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  const  document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
