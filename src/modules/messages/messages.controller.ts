import { 
    Controller,
    Post, 
    Get,
    Delete,
    Query,
    Param,
    Body, 
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { GetMessageDto } from './dto/get-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MessageParam } from './dto/message-param.dto';
@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}
    @Post()
    async createMessage(@Body() dto: CreateMessageDto): Promise<ApiResponse<GetMessageDto>>{
        try{
            const result = await this.messageService.createMessage(dto);
            return ApiResponse.success<GetMessageDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getPaginateMessage(@Query() query: MessageParam) : Promise<ApiResponse<PaginationDto<GetMessageDto>>>{
        try{
            const res = await this.messageService.getPaginateMessage(query);
            return ApiResponse.success<PaginationDto<GetMessageDto>>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Delete(':id')
    async deleteMessage(@Param('id') id: string): Promise<ApiResponse<GetMessageDto>>{
        try{
            const res = await this.messageService.deleteMessage(id);
            return ApiResponse.success<GetMessageDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
