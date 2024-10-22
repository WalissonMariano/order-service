import { Controller, Get } from '@nestjs/common';
import { ReturnTypeOfItemsDto } from './dto/return-type-of-items.dto';
import { TypeOfItemsService } from './type-of-items.service';

@Controller('type-of-items')
export class TypeOfItemsController {
    constructor(
        private readonly typeOfCategoryService: TypeOfItemsService,
    ) {}

    @Get()
    async getAllTypesOfItems(): Promise<ReturnTypeOfItemsDto[]> {
        return (await this.typeOfCategoryService.getAllTypesOfItems()).map(
            (typeOfItems) => new ReturnTypeOfItemsDto(typeOfItems),
        );
    }
}
