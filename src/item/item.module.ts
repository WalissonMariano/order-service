import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { TypeOfItemsModule } from 'src/type-of-items/type-of-items.module';
import { TypeOfItemsService } from 'src/type-of-items/type-of-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    forwardRef(() => TypeOfItemsModule)
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemsModule {}
