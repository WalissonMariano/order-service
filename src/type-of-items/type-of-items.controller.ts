import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnTypeOfItemsDto } from './dto/return-type-of-items.dto';
import { TypeOfItemsService } from './type-of-items.service';
import { CreateTypeOfItemsDto } from './dto/create-type-of-items.dto';
import { TypeOfItems } from './entities/type-of-items.entity';
import { DeleteResult } from 'typeorm';

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

    @UsePipes(ValidationPipe)
    @Post()
    async createTypesOfItems(
        @Body() createTypesOfItems: CreateTypeOfItemsDto,
    ): Promise<TypeOfItems> {
        return this.typeOfCategoryService.createTypesOfItems(createTypesOfItems)
    }

    @Delete('/:typeOfItemsId')
    async deleteTypeOfItems(
        @Param('typeOfItemsId') typeOfItemsId: number
    ): Promise<DeleteResult> {
        return this.typeOfCategoryService.deleteTypeOfItems(typeOfItemsId);
    }
}
