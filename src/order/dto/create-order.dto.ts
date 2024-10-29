import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateOrderItemsDto } from 'src/order-items/dto/create-order-items.dto';
import { Order } from '../entities/order.entity';
import { OrderItems } from 'src/order-items/entities/order-items.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Número do Pedido',
    example: 1,
  })
  @IsNumber()
  orderNumber: number;

  @ApiProperty({
    description: 'Descrição do Pedido',
    example: 'Pedido de água',
  })
  @IsString()
  orderDescription: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  orderItems?: CreateOrderItemsDto[];

  createdAt: Date;

  updateAt: Date;

}
