import { 
    Controller,
    Post, 
    Get,
    Delete,
    Param,
    Body,
 } from '@nestjs/common';
import { FollowUsService } from './follow-us.service';
import { GetFollowusDto } from './dto/get-followus.dto';
import { CreateFollowusDto } from './dto/create-followus.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
@Controller('follow-us')
export class FollowUsController {
    constructor(private readonly followService: FollowUsService) {}
    @Post()
        async create(@Body() dto: CreateFollowusDto): Promise<ApiResponse<GetFollowusDto>>{
            try{
                const result = await this.followService.create(dto);
                return ApiResponse.success<GetFollowusDto>(result);
            }catch(err){
                return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async get(): Promise<ApiResponse<GetFollowusDto[]>>{
        try{
            const res = await this.followService.get();
            return ApiResponse.success<GetFollowusDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetFollowusDto>>{
        try{
            const res = await this.followService.delete(id);
            return ApiResponse.success<GetFollowusDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
