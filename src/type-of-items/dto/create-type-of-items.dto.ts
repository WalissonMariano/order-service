import { ApiProperty } from '@nestjs/swagger';
export class CreateTypeOfItemsDto {
  @ApiProperty({
    description: 'Descrição do Tipo do Item',
    example: 'Produto',
  })
  typeItemsDescription: string;

  @ApiProperty({
    description: 'Porcentagem referente ao imposto',
    example: 18,
  })
  taxPercentagem: number;

  createdAt: Date;

  updateAt: Date;
}
