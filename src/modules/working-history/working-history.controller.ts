import { 
    Controller,
    Put,
    Delete,
    Param,
    Body,
    UseGuards
 } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@/common/response/api-response';
import { WorkingHistoryService } from './working-history.service';
import { GetWorkingHistoryDto } from './dto/get-workinghistory.dto';
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('working-history')
export class WorkingHistoryController {
    constructor(private readonly workinghistoryService: WorkingHistoryService) {}

    @Put(':id')
    async updateWorkingHistory(
        @Param('id') id: string, 
        @Body() update: UpdateWorkingHistoryDto,
        @GetUser('username') username: string,
    ): Promise<ApiResponse<GetWorkingHistoryDto>>{
        const res = await this.workinghistoryService.updateWorkingHistory(id, update, username);
        return ApiResponse.success<GetWorkingHistoryDto>(res)
    }


    @Delete(':id')
    async deleteWorkingHistory(@Param('id') id: string): Promise<ApiResponse<GetWorkingHistoryDto>>{
        const res = await this.workinghistoryService.deleteWorkingHistory(id);
        return ApiResponse.success<GetWorkingHistoryDto>(res)
    }
}
