import { 
    Controller,
    Get,
    Query
 } from '@nestjs/common';
import { FollowUsService } from '../follow-us.service';
import { GetFollowusDto } from '../dto/get-followus.dto';
import { ApiResponse } from '@/common/response/api-response';
import { FolowUsParam } from '../dto/followus-param.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('follow-us')
export class FollowUsClientController {
    constructor(private readonly followService: FollowUsService) {}

    @Get()
    @Public()
    async getFollowUs(@Query() query: FolowUsParam): Promise<ApiResponse<GetFollowusDto[]>>{
        const res = await this.followService.getFollowUs(query);
        return ApiResponse.success<GetFollowusDto[]>(res)
    }
}
