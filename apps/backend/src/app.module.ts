import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { ShopModule } from './product/shop.module';
import { Product } from './product/entities/product.entity';
import { MenuModule } from './menu/menu.module';
import { Menu } from './menu/entities/menu.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Ưu tiên dùng DATABASE_URL nếu có (dành cho Render Cloud)
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [User, Product, Menu],
            synchronize: true,
            ssl: { rejectUnauthorized: false }, // Bắt buộc cho database trên Render
          };
        }

        // Nếu không có DATABASE_URL thì dùng các biến rời (dành cho chạy Local)
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres_password'),
          database: configService.get<string>('DB_DATABASE', 'my_shop_db'),
          entities: [User, Product, Menu],
          synchronize: true, // Tự động tạo/đồng bộ bảng trong môi trường dev
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ShopModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }