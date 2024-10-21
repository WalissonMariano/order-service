import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { ItemsModule } from './items/items.module';
import { TypeOfItemsModule } from './type-of-items/type-of-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      extra: {
        ssl: process.env.DATABASE_URL ? true : false,
      },
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    OrderModule,
    ItemsModule,
    TypeOfItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}