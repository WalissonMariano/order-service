import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

  createdAt: Date;

  updateAt: Date;

}
