import { ApiProperty } from '@nestjs/swagger';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Número do Pedido',
    example: 1,
  })
  orderNumber: number;

  @ApiProperty({
    description: 'Descrição do Pedido',
    example: 'Pedido de água',
  })
  orderDescription: string;

  createdAt: Date;

  updateAt: Date;

  @ApiProperty({
    isArray: true,
    type: CreateItemDto,
  })
  items?: CreateItemDto[];
}
