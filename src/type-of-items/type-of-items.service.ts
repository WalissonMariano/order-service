import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOfItems } from './entities/type-of-items.entity';

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
}
