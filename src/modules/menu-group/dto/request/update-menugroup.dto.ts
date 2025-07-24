import { PartialType } from '@nestjs/swagger';
import { CreateMenuGroupDto } from './create-menugroup.dto';
export class UpdateMenuGroupDto extends PartialType(CreateMenuGroupDto){}