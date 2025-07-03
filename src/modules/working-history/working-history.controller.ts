import { 
    Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    DefaultValuePipe,
    ParseIntPipe
 } from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { WorkingHistoryService } from './working-history.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { GetWorkingHistoryDto } from './dto/get-workinghistory.dto';
import { CreateWorkingHistoryDto } from './dto/create-workinghistory.dto';
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
@Controller('working-history')
export class WorkingHistoryController {
    constructor(private readonly workinghistoryService: WorkingHistoryService) {}
    @Post('create')
    async create(@Body() dto: CreateWorkingHistoryDto): Promise<ApiResponse<GetWorkingHistoryDto>>{
        try{
            const result = await this.workinghistoryService.create(dto);
            return ApiResponse.success<GetWorkingHistoryDto>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }

    @Get('all')
    async get(): Promise<ApiResponse<GetWorkingHistoryDto[]>>{
        try{
            const res = await this.workinghistoryService.get();
            return ApiResponse.success<GetWorkingHistoryDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Get()
    async paginate(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) : Promise<ApiResponse<PaginationDto<GetWorkingHistoryDto>>>{
        try{
            const res = await this.workinghistoryService.paginate(page,limit);
            return ApiResponse.success<PaginationDto<GetWorkingHistoryDto>>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }


    @Put(':id')
    async update(
        @Param('id') id: string, 
        @Body() update: UpdateWorkingHistoryDto
    ): Promise<ApiResponse<GetWorkingHistoryDto>>{
        try{
            const res = await this.workinghistoryService.update(id, update);
            return ApiResponse.success<GetWorkingHistoryDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetWorkingHistoryDto>>{
        try{
            const res = await this.workinghistoryService.delete(id);
            return ApiResponse.success<GetWorkingHistoryDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
