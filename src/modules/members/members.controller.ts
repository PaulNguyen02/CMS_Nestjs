import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    DefaultValuePipe,
    ParseIntPipe
} from '@nestjs/common';
import { MembersService } from './members.service';
import { GetMemberDto } from './dto/get-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';

@Controller('members')
export class MembersController {
    constructor(private readonly memberService: MembersService) {}
    @Post()
        async create(@Body() dto: CreateMemberDto): Promise<ApiResponse<GetMemberDto>>{
        try{
            const result = await this.memberService.create(dto);
            return ApiResponse.success<GetMemberDto>(result);
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
        async paginate(
            @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
            @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        ) : Promise<ApiResponse<PaginationDto<GetMemberDto>>>{
            try{
                const res = await this.memberService.paginate(page,limit);
                return ApiResponse.success<PaginationDto<GetMemberDto>>(res)
            }catch(err){
                return ApiResponse.error()
            }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() update: UpdateMemberDto): Promise<ApiResponse<GetMemberDto>>{
        try{
            const res = await this.memberService.update(id, update);
            return ApiResponse.success<GetMemberDto>(res)
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ApiResponse<GetMemberDto>> {
        try{
            const res = await this.memberService.findOne(id); 
            return ApiResponse.success<GetMemberDto>(res)
        }catch(error){
            return ApiResponse.error()
        }
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetMemberDto>>{
        try{
            const res = await this.memberService.delete(id);
            return ApiResponse.success<GetMemberDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
