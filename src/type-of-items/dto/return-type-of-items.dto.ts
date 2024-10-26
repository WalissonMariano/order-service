import { ReturnItemDto } from 'src/item/dto/return-item.dto';
import { TypeOfItems } from '../entities/type-of-items.entity';

export class ReturnTypeOfItemsDto {
  id: number;
  typeItemsDescription: string;
  taxPercentagem: number;

  constructor(typeOfItems: TypeOfItems) {
    this.id = typeOfItems.id;
    this.typeItemsDescription = typeOfItems.typeItemsDescription;
    this.taxPercentagem = typeOfItems.taxPercentagem;
  }
}
