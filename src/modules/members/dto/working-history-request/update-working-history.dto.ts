import { PartialType } from '@nestjs/swagger';
import { CreateWorkingHistoryDto } from '../working-history-request/create-working-history.dto';
export class UpdateWorkingHistoryDto extends PartialType(CreateWorkingHistoryDto){}