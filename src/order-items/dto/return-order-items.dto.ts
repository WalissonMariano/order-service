import { Item } from 'src/item/entities/item.entity';
import { OrderItems } from '../entities/order-items.entity';

export class ReturnOrderItemsDto {
  orderId: number;
  quantity: number;
  taxValue: number;
  totalValue: number;
  item: Item;

  constructor(orderItems: OrderItems) {
    this.orderId = orderItems.orderId;
    this.quantity = orderItems.quantity;
    this.taxValue = orderItems.taxValue;
    this.totalValue = orderItems.totalValue;
    this.item = orderItems.item;
  }
}
