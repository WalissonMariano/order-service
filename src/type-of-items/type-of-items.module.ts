import { Module } from '@nestjs/common';
import { TypeOfItemsService } from './type-of-items.service';
import { TypeOfItemsController } from './type-of-items.controller';

@Module({
  providers: [TypeOfItemsService],
  controllers: [TypeOfItemsController]
})
export class TypeOfItemsModule {}
