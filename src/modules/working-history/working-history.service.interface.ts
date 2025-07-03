import { GetWorkingHistoryDto } from './dto/get-workinghistory.dto';
import { CreateWorkingHistoryDto } from './dto/create-workinghistory.dto';
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
import { PaginationDto } from "@/common/dto/pagination.dto";
export interface IWorkingHistoryService {
    create(dto: CreateWorkingHistoryDto): Promise<GetWorkingHistoryDto>;
    update (working_history_id: string, dto: UpdateWorkingHistoryDto): Promise<GetWorkingHistoryDto>
    get(): Promise<GetWorkingHistoryDto[]>
    delete(working_history_id: string): Promise<GetWorkingHistoryDto>
    paginate(page: number, limit: number): Promise<PaginationDto<GetWorkingHistoryDto>>
}