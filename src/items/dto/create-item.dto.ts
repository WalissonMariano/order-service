import { ApiProperty } from '@nestjs/swagger';
export class CreateItemDto {

  @ApiProperty({
    description: 'Número do Item',
    example: 1,
  })
  numberItem: number;

  @ApiProperty({
    description: 'Id referente ao tipo do item',
    example: 2,
  })
  typeOfItemId: number;

  @ApiProperty({
    description: 'Descrição do Item',
    example: 'Galão de água 20L',
  })
  itemDescription: string;

  @ApiProperty({
    description: 'Valor unitário do item',
    example: 15,
  })
  unitValue: number;

  @ApiProperty({
    description: 'Url imagem do item',
    example: 'https://i.ibb.co/Jj7sLtz/Untitled-6.png',
  })
  image: string;

  createdAt: Date;
  updateAt: Date;
}
