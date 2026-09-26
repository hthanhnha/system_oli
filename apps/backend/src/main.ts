import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thêm prefix api/n1 cho tất cả các route
  app.setGlobalPrefix('api/n1');

  // Bật Validation global cho các DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Cho phép Next.js và Mobile App gọi API mà không bị lỗi CORS
  app.enableCors();

  // Cấu hình Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Shop API Documentation')
    .setDescription('Hệ thống API dùng chung cho Web Next.js và Mobile App')
    .setVersion('1.0')
    .addTag('Auth', 'APIs xác thực người dùng (Đăng ký, Đăng nhập, Profile)')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory); // Link Swagger: http://localhost:7777/api

  const port = process.env.PORT || 7777;
  await app.listen(port);
  console.log(`🚀 Backend đang chạy tại: http://localhost:${port}`);
  console.log(`📚 Swagger Documentation: http://localhost:${port}/api`);
}
bootstrap();