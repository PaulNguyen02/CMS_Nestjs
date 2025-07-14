import { 
    Controller,
    Post, 
    Get,
    Delete,
    Query,
    Param,
    Body, 
    UseGuards
} from '@nestjs/common';
import { MessagesService } from '../messages.service';
import { GetMessageDto } from '../dto/get-message.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MessageParam } from '../dto/message-param.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(JwtAuthGuard)
@Controller({path: 'messages', version:'1'})
export class MessagesV1Controller {
    constructor(private readonly messageService: MessagesService) {}

    @Public()
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
