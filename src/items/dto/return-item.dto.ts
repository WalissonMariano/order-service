import { Item } from '../entities/item.entity';

export class ReturnItemDto {
  numberItem: number;
  typeOfItemsId: number;
  itemDescription: string;
  unitValue: number;
  image: string;

  constructor(item: Item) {
    this.numberItem = item.numberItem;
    this.typeOfItemsId = item.typeOfItemsId;
    this.itemDescription = item.itemDescription;
    this.unitValue = item.unitValue;
    this.image = item.image;
  }
}
