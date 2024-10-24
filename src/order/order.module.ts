import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ItemsService } from 'src/item/item.service';
import { Item } from 'src/item/entities/item.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ItemsService],
  exports: [OrderService],
})
export class OrderModule {}
