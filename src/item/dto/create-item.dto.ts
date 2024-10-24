import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateItemDto {

  @ApiProperty({
    description: 'Número do Item',
    example: 1,
  })
  @IsNumber()
  numberItem: number;

  @ApiProperty({
    description: 'Id referente ao tipo do item',
    example: 2,
  })
  @IsNumber()
  typeOfItemId: number;

  @ApiProperty({
    description: 'Descrição do Item',
    example: 'Galão de água 20L',
  })
  @IsString()
  itemDescription: string;

  @ApiProperty({
    description: 'Valor unitário do item',
    example: 15,
  })
  @IsNumber()
  unitValue: number;

  @ApiProperty({
    description: 'Url imagem do item',
    example: 'https://i.ibb.co/Jj7sLtz/Untitled-6.png',
  })
  @IsString()
  image: string;

  createdAt: Date;
  updateAt: Date;
}
