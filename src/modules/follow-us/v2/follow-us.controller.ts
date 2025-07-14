import { 
    Controller,
    Get,
    Query,
    UseGuards
 } from '@nestjs/common';
import { FollowUsService } from '../follow-us.service';
import { GetFollowusDto } from '../dto/get-followus.dto';
import { ApiResponse } from '@/common/response/api-response';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { FolowUsParam } from '../dto/followus-param.dto';
import { Public } from '@/common/decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller({path: 'follow-us', version:'2'})
export class FollowUsV2Controller {
    constructor(private readonly followService: FollowUsService) {}

    @Get()
    @Public()
    async getFollowUs(@Query() query: FolowUsParam): Promise<ApiResponse<GetFollowusDto[]>>{
        const res = await this.followService.getFollowUs(query);
        return ApiResponse.success<GetFollowusDto[]>(res)
    }
}
