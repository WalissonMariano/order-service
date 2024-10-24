import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ReturnItemDto } from './dto/return-item.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Get()
  async getAllItems(): Promise<ReturnItemDto[]> {
    return (await this.itemService.getAllItems()).map(
      (items) => new ReturnItemDto(items),
    );
  }

  @Get(':id')
  getItemById(@Param('id') id: number) {
    return this.itemService.getItemById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.itemService.deleteItem(id);
  }
}
