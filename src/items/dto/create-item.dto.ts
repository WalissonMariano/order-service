import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto {
  orderId: number;

  @ApiProperty({
    description: 'Número do Item',
    example: 1,
  })
  numberItem: number;

  @ApiProperty({
    description: 'Descrição do Item',
    example: 'Galão de água 20L',
  })
  itemDescription: string;

  @ApiProperty({
    description: 'Tipo do item, "product","service","location"',
    example: 'product',
  })
  typeOfItems: string;

  @ApiProperty({
    description: 'Quantidade solicitada',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Valor unitário do item',
    example: 15,
  })
  unitValue: number;

  taxValue?: number;
  createdAt: Date;
  updateAt: Date;
}
