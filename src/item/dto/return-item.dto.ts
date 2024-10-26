import { ReturnTypeOfItemsDto } from 'src/type-of-items/dto/return-type-of-items.dto';
import { Item } from '../entities/item.entity';

export class ReturnItemDto {
  id: number;
  numberItem: number;
  itemDescription: string;
  unitValue: number;
  image: string;
  typeOfItems: ReturnTypeOfItemsDto;

  constructor(item: Item) {
    this.id = item.id;
    this.numberItem = item.numberItem;
    this.itemDescription = item.itemDescription;
    this.unitValue = item.unitValue;
    this.image = item.image;
    this.typeOfItems = item.typeOfItems;
  }
}
