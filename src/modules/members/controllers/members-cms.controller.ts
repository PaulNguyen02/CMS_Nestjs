import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MembersService } from '../members.service';
import { GetMemberDto } from '../dto/member-response/get-member.dto';
import { CreateMemberDto } from '../dto/member-request/create-member.dto';
import { UpdateMemberDto } from '../dto/member-request/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MemberParam } from '../dto/member-request/member-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';

@ApiBearerAuth('access-token')
@Controller('members')
export class MembersCMSController {
    constructor(private readonly memberService: MembersService) {}

    @Get()
    async getPaginateMember(@Query() query: MemberParam) : Promise<ApiResponse<PaginationDto<GetMemberDto>>>{
        const res = await this.memberService.getPaginateMember(query);
        return ApiResponse.success<PaginationDto<GetMemberDto>>(res)
    }

    @Get('search')
    async searchCategory(@Query('query') search: string): Promise<ApiResponse<GetMemberDto[]>>
    {
        const res = await this.memberService.searchMember(search);
        return ApiResponse.success<GetMemberDto[]>(res);
    }

    @Get(':id')
    async getDetailMember(@Param('id') id: string) : Promise<ApiResponse<GetMemberDto>>{
        const res = await this.memberService.getDetailMember(id);
        return ApiResponse.success<GetMemberDto>(res)
    }    

    @Post()
    async createMember(
        @Body() dto: CreateMemberDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMemberDto>>{
        const result = await this.memberService.createMember(dto, username);
        return ApiResponse.success<GetMemberDto>(result);
    }

    @Put(':id')
    async updateMember(
        @Param('id') id: string, 
        @Body() update: UpdateMemberDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMemberDto>>{
        const res = await this.memberService.updateMember(id, update, username);
        return ApiResponse.success<GetMemberDto>(res)
    }
   
    @Delete(':id')
    async deleteMember(@Param('id') id: string): Promise<ApiResponse<GetMemberDto>>{
        const res = await this.memberService.deleteMember(id);
        return ApiResponse.success<GetMemberDto>(res)
    }
}
