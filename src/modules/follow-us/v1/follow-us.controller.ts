import { 
    Controller,
    Post, 
    Get,
    Delete,
    Param,
    Body,
    Query,
    UseGuards
 } from '@nestjs/common';
import { FollowUsService } from '../follow-us.service';
import { GetFollowusDto } from '../dto/get-followus.dto';
import { CreateFollowusDto } from '../dto/create-followus.dto';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { FolowUsParam } from '../dto/followus-param.dto';
import { Public } from '@/common/decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller({path: 'follow-us', version:'1'})
export class FollowUsV1Controller {
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
    @Public()
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
