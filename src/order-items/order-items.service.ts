import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderItems } from './entities/order-items.entity';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItems)
        private readonly orderItemsRepository: Repository<OrderItems>,
    ){}

    async getAllTypesOfItems(): Promise<OrderItems[]> {
        const orderItems = this.orderItemsRepository.find()

        return orderItems;
    }

    async createOrderItems(
        createOrderItems: CreateOrderItemsDto,
    ): Promise<OrderItems> {
        return this.orderItemsRepository.save(createOrderItems);
    }
}
