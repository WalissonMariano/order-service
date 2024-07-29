import { Item } from '../entities/item.entity';

export class ReturnItemDto {
  numberItem: number;
  itemDescription: string;
  typeOfItems: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  taxValue: number;

  constructor(item: Item) {
    this.numberItem = item.numberItem;
    this.itemDescription = item.itemDescription;
    this.typeOfItems = item.typeOfItems;
    this.quantity = item.quantity;
    this.unitValue = item.unitValue;
    this.totalValue = item.totalValue;
    this.taxValue = item.taxValue;
  }
}
