import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body
} from '@nestjs/common';
import { MembersService } from './members.service';
import { GetMemberDto } from './dto/get-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MemberParam } from './dto/member-param.dto';

@Controller('members')
export class MembersController {
    constructor(private readonly memberService: MembersService) {}
    @Post()
    async createMember(@Body() dto: CreateMemberDto): Promise<ApiResponse<GetMemberDto>>{
        try{
            const result = await this.memberService.createMember(dto);
            return ApiResponse.success<GetMemberDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getPaginateMember(@Query() query: MemberParam) : Promise<ApiResponse<PaginationDto<GetMemberDto>>>{
        try{
            const res = await this.memberService.getPaginateMember(query);
            return ApiResponse.success<PaginationDto<GetMemberDto>>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Put(':id')
    async updateMember(@Param('id') id: string, @Body() update: UpdateMemberDto): Promise<ApiResponse<GetMemberDto>>{
        try{
            const res = await this.memberService.updateMember(id, update);
            return ApiResponse.success<GetMemberDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }
    
    @Get(':id')
    async findMemberbyId(@Param('id') id: string): Promise<ApiResponse<GetMemberDto>> {
        try{
            const res = await this.memberService.findMemberbyId(id); 
            return ApiResponse.success<GetMemberDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
    
    @Delete(':id')
    async deleteMember(@Param('id') id: string): Promise<ApiResponse<GetMemberDto>>{
        try{
            const res = await this.memberService.deleteMember(id);
            return ApiResponse.success<GetMemberDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
