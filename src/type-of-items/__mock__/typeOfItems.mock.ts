import { itemMock } from "../../item/__mock__/item.mock";
import { TypeOfItems } from "../entities/type-of-items.entity";

export const typeOfItemsMock: TypeOfItems = {
    id: 23,
    typeItemsDescription: "Produto",
    taxPercentagem: 10,
    createdAt: new Date(),
    updateAt: new Date(),
    item: []
}
