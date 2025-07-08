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
import { ApiResponse } from '@/common/response/api-response';
@Controller('follow-us')
export class FollowUsController {
    constructor(private readonly followService: FollowUsService) {}
    @Post()
    async createFollowUs(@Body() dto: CreateFollowusDto): Promise<ApiResponse<GetFollowusDto>>{
        try{
            const result = await this.followService.createFollowUs(dto);
            return ApiResponse.success<GetFollowusDto>(result);
        }catch{
                return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getFollowUs(): Promise<ApiResponse<GetFollowusDto[]>>{
        try{
            const res = await this.followService.getFollowUs();
            return ApiResponse.success<GetFollowusDto[]>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async deleteFollowUs(@Param('id') id: string): Promise<ApiResponse<GetFollowusDto>>{
        try{
            const res = await this.followService.deleteFollowUs(id);
            return ApiResponse.success<GetFollowusDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
