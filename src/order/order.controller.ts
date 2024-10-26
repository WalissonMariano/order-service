import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ReturnOrderDto } from './dto/return-order.dto';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getAllOrders(): Promise<ReturnOrderDto[]> {
    return (await this.orderService.getAllOrders()).map(
      (order) => new ReturnOrderDto(order),
    );
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<ReturnOrderDto> {
    return new ReturnOrderDto(await this.orderService.getOrderById(+id));
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}
