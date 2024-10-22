import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReturnTypeOfItemsDto } from './dto/return-type-of-items.dto';
import { TypeOfItemsService } from './type-of-items.service';
import { CreateTypeOfItemsDto } from './dto/create-type-of-items.dto';
import { TypeOfItems } from './entities/type-of-items.entity';

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

    @Post()
    async createTypesOfItems(
        @Body() createTypesOfItems: CreateTypeOfItemsDto,
    ): Promise<TypeOfItems> {
        return this.typeOfCategoryService.createTypesOfItems(createTypesOfItems)
    }
}
