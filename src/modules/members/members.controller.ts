import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MembersService } from './members.service';
import { GetMemberDto } from './dto/get-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MemberParam } from './dto/member-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('members')
export class MembersController {
    constructor(private readonly memberService: MembersService) {}
    @Post()
    async createMember(
        @Body() dto: CreateMemberDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMemberDto>>{
        const result = await this.memberService.createMember(dto, username);
        return ApiResponse.success<GetMemberDto>(result);
    }

    @Get()
    async getPaginateMember(@Query() query: MemberParam) : Promise<ApiResponse<PaginationDto<GetMemberDto>>>{
        const res = await this.memberService.getPaginateMember(query);
        return ApiResponse.success<PaginationDto<GetMemberDto>>(res)
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
