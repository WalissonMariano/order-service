import { forwardRef, Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderItems } from './entities/order-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItems]),
    forwardRef(() => Item),
    OrderItemsModule,
  ],
  providers: [OrderItemsService],
  controllers: [OrderItemsController],
})
export class OrderItemsModule {}
