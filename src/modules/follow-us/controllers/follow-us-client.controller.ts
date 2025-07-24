import { 
    Controller,
    Get,
    Query
 } from '@nestjs/common';
import { FollowUsService } from '../follow-us.service';
import { GetFollowUsDto } from '../dto/response/get-follow-us.dto';
import { ApiResponse } from '@/common/response/api-response';
import { FollowUsParam } from '../dto/request/follow-us-param.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('follow-us')
export class FollowUsClientController {
    constructor(private readonly followService: FollowUsService) {}

    @Get()
    @Public()
    async getFollowUs(@Query() query: FollowUsParam): Promise<ApiResponse<GetFollowUsDto[]>>{
        const res = await this.followService.getFollowUs(query);
        return ApiResponse.success<GetFollowUsDto[]>(res)
    }
}
