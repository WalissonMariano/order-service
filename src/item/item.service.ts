import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemRepository.save({
      ...createItemDto,
    });
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: number) {
    const item = this.itemRepository.findOne({
      where: { id },
    });
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOne({
      where: { id },
    });

    item.itemDescription = updateItemDto.itemDescription;
    item.numberItem = updateItemDto.numberItem;

    return await this.itemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
