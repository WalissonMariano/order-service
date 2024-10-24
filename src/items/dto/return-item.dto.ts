import { Item } from '../entities/item.entity';

export class ReturnItemDto {
  numberItem: number;
  itemDescription: string;
  idTypeOfItems: number;
  quantity: number;
  unitValue: number;

  constructor(item: Item) {
    this.numberItem = item.numberItem;
    this.itemDescription = item.itemDescription;
    this.idTypeOfItems = item.idTypeOfItems;
    this.unitValue = item.unitValue;
  }
}
