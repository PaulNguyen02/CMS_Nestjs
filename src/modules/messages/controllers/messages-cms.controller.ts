import { 
    Controller,
    Get,
    Delete,
    Query,
    Param
} from '@nestjs/common';
import { MessagesService } from '../messages.service';
import { GetMessageDto } from '../dto/get-message.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MessageParam } from '../dto/message-param.dto';

@Controller('messages')
export class MessagesCMSController {
    constructor(private readonly messageService: MessagesService) {}

    @Get()
    async getPaginateMessage(@Query() query: MessageParam) : Promise<ApiResponse<PaginationDto<GetMessageDto>>>{
        const res = await this.messageService.getPaginateMessage(query);
        return ApiResponse.success<PaginationDto<GetMessageDto>>(res)
    }

    @Delete(':id')
    async deleteMessage(@Param('id') id: string): Promise<ApiResponse<GetMessageDto>>{
        const res = await this.messageService.deleteMessage(id);
        return ApiResponse.success<GetMessageDto>(res)
    }
}
