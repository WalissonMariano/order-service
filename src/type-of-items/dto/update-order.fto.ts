import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeOfItemsDto } from './create-type-of-items.dto';

export class UpdateTypeOfItemsDto extends PartialType(CreateTypeOfItemsDto) {}
