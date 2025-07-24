import { PartialType } from '@nestjs/swagger';
import { CreateMenuItemDto } from './create-menuitem.dto';
export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto){}