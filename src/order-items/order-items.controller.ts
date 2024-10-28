import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderItemsDto } from './dto/create-order-items.dto';
import { OrderItems } from './entities/order-items.entity';
import { ReturnOrderItemsDto } from './dto/return-order-items.dto';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
    constructor(
        private readonly orderItemsService: OrderItemsService,
    ) {}

    @Post()
    async createOrderItems(
        @Body() createOrderItems: CreateOrderItemsDto,
    ): Promise<OrderItems> {
        return this.orderItemsService.createOrderItems(createOrderItems)
    }

    @Get()
    async getAllOrderItems(): Promise<ReturnOrderItemsDto[]> {
        return (await this.orderItemsService.getAllTypesOfItems()).map(
            (orderItems) => new ReturnOrderItemsDto(orderItems),
        );
    }

}
