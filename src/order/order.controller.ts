import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post(':id/items')
  async createItem(
    @Param('id') id: number,
    @Body() createItemDto: CreateItemDto,
  ) {
    return await this.orderService.createItemOrder(id, createItemDto);
  }

  @Get()
  async findAll(): Promise<ReturnOrderDto[]> {
    return (await this.orderService.findAll()).map(
      (order) => new ReturnOrderDto(order),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnOrderDto> {
    return new ReturnOrderDto(await this.orderService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
