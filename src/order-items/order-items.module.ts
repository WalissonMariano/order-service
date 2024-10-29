import { forwardRef, Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItems } from './entities/order-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { ItemsModule } from 'src/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItems]),
    forwardRef(() => Item),
    ItemsModule,
    OrderItemsModule,
  ],
  providers: [OrderItemsService],
  exports: [OrderItemsModule, OrderItemsService]
})
export class OrderItemsModule {}
