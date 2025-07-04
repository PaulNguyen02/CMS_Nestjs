import { 
    Controller,
    Post, 
    Get,
    Delete,
    Query,
    Param,
    Body,
    DefaultValuePipe,
    ParseIntPipe 
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { GetMessageDto } from './dto/get-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}
    @Post()
    async create(@Body() dto: CreateMessageDto): Promise<ApiResponse<GetMessageDto>>{
        try{
            const result = await this.messageService.create(dto);
            return ApiResponse.success<GetMessageDto>(result);
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async paginate(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) : Promise<ApiResponse<PaginationDto<GetMessageDto>>>{
        try{
            const res = await this.messageService.paginate(page,limit);
            return ApiResponse.success<PaginationDto<GetMessageDto>>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetMessageDto>>{
        try{
            const res = await this.messageService.delete(id);
            return ApiResponse.success<GetMessageDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
