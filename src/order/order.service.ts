import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from '../item/dto/create-item.dto';
import { ItemService } from '../item/item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly itemsService: ItemService,
  ) {}

  calculateItemValue(createItemDto: CreateItemDto) {
    let taxValue: number;
    let totalValue: number;
    switch (createItemDto['typeOfItems']) {
      case 'product':
        taxValue = createItemDto['unitValue'] * 0.1 * createItemDto['quantity'];
        totalValue = createItemDto['unitValue'] * createItemDto['quantity'];

        createItemDto['taxValue'] = taxValue;
        createItemDto['totalValue'] = totalValue;

        break;
      case 'service':
        taxValue =
          createItemDto['unitValue'] * 0.075 * createItemDto['quantity'];
        totalValue = createItemDto['unitValue'] * createItemDto['quantity'];

        createItemDto['taxValue'] = taxValue;
        createItemDto['totalValue'] = totalValue;
        break;
      case 'location':
        taxValue =
          createItemDto['unitValue'] * 0.05 * createItemDto['quantity'];
        totalValue = createItemDto['unitValue'] * createItemDto['quantity'];

        createItemDto['taxValue'] = taxValue;
        createItemDto['totalValue'] = totalValue;
        break;
      default:
        throw new NotFoundException(`O tipo de produto é invalido`);
    }

    return createItemDto;
  }

  create(createOrderDto: CreateOrderDto) {
    if (createOrderDto['items']) {
      for (let i = 0; i < createOrderDto['items'].length; i++) {
        createOrderDto['items'][i] = this.calculateItemValue(
          createOrderDto['items'][i],
        );
      }
    }
    return this.orderRepository.save({
      ...createOrderDto,
    });
  }

  async createItemOrder(id: number, createItemDto: CreateItemDto) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Pedido não existente.`);
    }

    createItemDto['orderId'] = id;
    createItemDto = this.calculateItemValue(createItemDto);

    return this.itemsService.create(createItemDto);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        items: true,
      },
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
