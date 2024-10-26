import { IsNumber } from "class-validator";

export class CreateOrderItemsDto {
    @IsNumber()
    orderId: number;

    @IsNumber()
    itemId: number;

    @IsNumber()
    quantity: number;
    
    createdAt: Date;
    updateAt: Date;
}