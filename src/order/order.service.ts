import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateItemDto } from '../item/dto/create-item.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async calculateItemValue(createItemDto: CreateItemDto) {
    

    return createItemDto;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find()

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

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save({
      ...createOrderDto,
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
