import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ItemService } from 'src/item/item.service';
import { OrderItemsService } from 'src/order-items/order-items.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly itemService: ItemService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: ['orderItems']
    })

    if (!orders || orders.length === 0) {
      throw new NotFoundException(`Not found orders`);
    }

    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order || order == null) {
      throw new NotFoundException(`Order id ${id} not found.`);
    }

    return order;
  }

  async getOrderByNumber(orderNumber: number) {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
    });

    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.getOrderByNumber(createOrderDto.orderNumber);

    if (order) {
      throw new NotFoundException(`existing order number ${createOrderDto.orderNumber}`);
    }

    if(!createOrderDto.orderItems || createOrderDto.orderItems.length === 0) {
      throw new BadRequestException('orderItems are required.');
    }

    for (const orderItem of createOrderDto.orderItems) {
        await this.itemService.getItemById(orderItem.itemId);
    }

    const orderItemsValues = await Promise.all(
      createOrderDto.orderItems.map(async (orderItems) => {
        const taxValue = await this.orderItemsService.calculateTaxValue(orderItems.itemId,orderItems.quantity);
        const totalValue = await this.orderItemsService.calculateTotalValue(orderItems.itemId,orderItems.quantity);

        return {
          ...orderItems,
          taxValue,
          totalValue,
        }
      })
    );

    return this.orderRepository.save({
      ...createOrderDto,
      orderItems: orderItemsValues,
    });
  }

  async deleteOrder(orderId: number): Promise<DeleteResult> {
    await this.getOrderById(orderId);

    return this.orderRepository.delete({id: orderId});
  }

  async updateOrder(orderId: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.getOrderById(orderId);

    order.orderNumber = updateOrderDto.orderNumber;
    order.orderDescription = updateOrderDto.orderDescription;

    return await this.orderRepository.save(order);
  }
 
}
