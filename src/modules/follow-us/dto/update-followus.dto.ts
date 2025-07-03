import { PartialType } from '@nestjs/swagger';
import { CreateFollowusDto } from "./create-followus.dto";
export class UpdateFollowusDto extends PartialType(CreateFollowusDto){}