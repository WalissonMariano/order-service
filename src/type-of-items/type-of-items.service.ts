import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOfItems } from './entities/type-of-items.entity';
import { CreateTypeOfItemsDto } from './dto/create-type-of-items.dto';

@Injectable()
export class TypeOfItemsService {
    constructor(
        @InjectRepository(TypeOfItems)
        private readonly typeOfItemsRepository: Repository<TypeOfItems>,
    ) {}

    async getAllTypesOfItems(): Promise<TypeOfItems[]> {
        const typeOfItems = await this.typeOfItemsRepository.find();

        if (!typeOfItems || typeOfItems.length === 0) {
            throw new NotFoundException(`type of items empty`);
        }

        return typeOfItems;
    }

    async getAllTypeOfItemsByName(typeItemsDescription: string): Promise<TypeOfItems> {
        const typeOfItems = await this.typeOfItemsRepository.findOne({
            where: {
                typeItemsDescription,
            }
        })

        if (!typeOfItems) {
            throw new NotFoundException(`Type ${typeItemsDescription} not found`);
        }

        return typeOfItems;
    } 

    async createTypesOfItems(
        createTypesOfItems: CreateTypeOfItemsDto,
    ): Promise<TypeOfItems> {
       const typeOfItems = await this.getAllTypeOfItemsByName(createTypesOfItems.typeItemsDescription)
       .catch(
            () => undefined,
       );

       if(typeOfItems) {
            throw new BadRequestException(
                `Type ${createTypesOfItems.typeItemsDescription} exist`,
            );
       }
       
       return this.typeOfItemsRepository.save(createTypesOfItems);
    }
       
}
