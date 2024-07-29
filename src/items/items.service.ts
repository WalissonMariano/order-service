import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemsRepository.save({
      ...createItemDto,
    });
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    const item = this.itemsRepository.findOne({
      where: { id },
    });
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOne({
      where: { id },
    });

    item.itemDescription = updateItemDto.itemDescription;
    item.numberItem = updateItemDto.numberItem;
    item.quantity = updateItemDto.numberItem;

    return await this.itemsRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    await this.itemsRepository.delete(id);
  }
}
