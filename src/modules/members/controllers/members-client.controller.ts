import { Controller, 
    Get,
    Param,
    Query
} from '@nestjs/common';
import { MembersService } from '../members.service';
import { GetMemberDto } from '../dto/get-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MemberParam } from '../dto/member-param.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('members')
export class MembersClientController {
    constructor(private readonly memberService: MembersService) {}

    @Public()
    @Get()
    async getPaginateMember(@Query() query: MemberParam) : Promise<ApiResponse<PaginationDto<GetMemberDto>>>{
        const res = await this.memberService.getPaginateMember(query);
        return ApiResponse.success<PaginationDto<GetMemberDto>>(res)
    }

    @Public()
    @Get(':slug')
    async getDetailMember(@Param('slug') slug: string) : Promise<ApiResponse<GetMemberDto>>{
        const res = await this.memberService.getDetailMember(slug);
        return ApiResponse.success<GetMemberDto>(res)
    }

}
