import { PartialType } from '@nestjs/swagger';
import { CreateWorkingHistoryDto } from './create-workinghistory.dto';
export class UpdateWorkingHistoryDto extends PartialType(CreateWorkingHistoryDto){}