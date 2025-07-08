import { 
    Controller,
    Put,
    Delete,
    Param,
    Body
 } from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { WorkingHistoryService } from './working-history.service';
import { GetWorkingHistoryDto } from './dto/get-workinghistory.dto';
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
@Controller('working-history')
export class WorkingHistoryController {
    constructor(private readonly workinghistoryService: WorkingHistoryService) {}

    @Put(':id')
    async updateWorkingHistory(
        @Param('id') id: string, 
        @Body() update: UpdateWorkingHistoryDto
    ): Promise<ApiResponse<GetWorkingHistoryDto>>{
        try{
            const res = await this.workinghistoryService.updateWorkingHistory(id, update);
            return ApiResponse.success<GetWorkingHistoryDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }


    @Delete(':id')
    async deleteWorkingHistory(@Param('id') id: string): Promise<ApiResponse<GetWorkingHistoryDto>>{
        try{
            const res = await this.workinghistoryService.deleteWorkingHistory(id);
            return ApiResponse.success<GetWorkingHistoryDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
