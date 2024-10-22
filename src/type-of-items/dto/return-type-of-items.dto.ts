import { ReturnItemDto } from 'src/items/dto/return-item.dto';
import { TypeOfItems } from '../entities/type-of-items.entity';

export class ReturnTypeOfItemsDto {
  id: number;
  typeItemsDescription: string;
  taxPercentagem: number;
  createAt: Date;

  constructor(typeOfItems: TypeOfItems) {
    this.id = typeOfItems.id;
    this.typeItemsDescription = typeOfItems.typeItemsDescription;
    this.taxPercentagem = typeOfItems.taxPercentagem;
    this.createAt = typeOfItems.createdAt;
  }
}
