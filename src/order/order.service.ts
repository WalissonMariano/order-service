import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save({
      ...createOrderDto,
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order || order == null) {
      throw new NotFoundException(`Pedido não existente.`);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    order.orderNumber = updateOrderDto.orderNumber;
    order.orderDescription = updateOrderDto.orderDescription;
    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
