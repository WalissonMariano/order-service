import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ReturnItemDto } from './dto/return-item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Cria item' })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.createItem(createItemDto);
  }

  @ApiOperation({ summary: 'Busca todos os itens' })
  @Get()
  async getAllItems(): Promise<ReturnItemDto[]> {
    return (await this.itemService.getAllItems()).map(
      (items) => new ReturnItemDto(items),
    );
  }

  @ApiOperation({ summary: 'Busca item por id' })
  @Get(':id')
  async getItemById(@Param('id') id: number) {
    return await this.itemService.getItemById(id);
  }

  @ApiOperation({ summary: 'Deleta item por id' })
  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    return await this.itemService.deleteItem(id);
  }

  @ApiOperation({ summary: 'Altera item por id' })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async updateItem(
    @Param('id') id: number, 
    @Body() updateItemDto: UpdateItemDto
  ) {
    return await this.itemService.updateItem(id, updateItemDto);
  }
}
