export class CreateItemDto {
  orderId: number;
  numberItem: number;
  itemDescription: string;
  typeOfItems: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  taxValue: number;
  createdAt: Date;
  updateAt: Date;
}
