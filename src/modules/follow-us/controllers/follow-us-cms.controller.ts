import { 
    Controller,
    Post, 
    Get,
    Delete,
    Param,
    Body,
    Query
 } from '@nestjs/common';
import { FollowUsService } from '../follow-us.service';
import { GetFollowUsDto } from '../dto/response/get-follow-us.dto';
import { CreateFollowUsDto } from '../dto/request/create-follow-us.dto';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { FollowUsParam } from '../dto/request/follow-us-param.dto';

@Controller('follow-us')
export class FollowUsCMSController {
    constructor(private readonly followService: FollowUsService) {}
    
    @Get()
    async getFollowUs(@Query() query: FollowUsParam): Promise<ApiResponse<GetFollowUsDto[]>>{
        const res = await this.followService.getFollowUs(query);
        return ApiResponse.success<GetFollowUsDto[]>(res)
    }

    @Post()
    async createFollowUs(
        @Body() dto: CreateFollowUsDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetFollowUsDto>>{
        const result = await this.followService.createFollowUs(dto, username);
        return ApiResponse.success<GetFollowUsDto>(result);
    }

    @Delete(':id')
    async deleteFollowUs(@Param('id') id: string): Promise<ApiResponse<GetFollowUsDto>>{
        const res = await this.followService.deleteFollowUs(id);
        return ApiResponse.success<GetFollowUsDto>(res)
    }
}
