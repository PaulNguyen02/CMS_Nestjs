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
import { GetFollowusDto } from '../dto/get-followus.dto';
import { CreateFollowusDto } from '../dto/create-followus.dto';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { FolowUsParam } from '../dto/followus-param.dto';

@Controller('follow-us')
export class FollowUsCMSController {
    constructor(private readonly followService: FollowUsService) {}
    
    @Post()
    async createFollowUs(
        @Body() dto: CreateFollowusDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetFollowusDto>>{
        const result = await this.followService.createFollowUs(dto, username);
        return ApiResponse.success<GetFollowusDto>(result);
    }

    @Get()
    async getFollowUs(@Query() query: FolowUsParam): Promise<ApiResponse<GetFollowusDto[]>>{
        const res = await this.followService.getFollowUs(query);
        return ApiResponse.success<GetFollowusDto[]>(res)
    }

    @Delete(':id')
    async deleteFollowUs(@Param('id') id: string): Promise<ApiResponse<GetFollowusDto>>{
        const res = await this.followService.deleteFollowUs(id);
        return ApiResponse.success<GetFollowusDto>(res)
    }
}
