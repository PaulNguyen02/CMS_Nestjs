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
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './messages.service';
import { GetMessageDto } from './dto/get-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MessageParam } from './dto/message-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}
    @Post()
    async createMessage(
        @Body() dto: CreateMessageDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMessageDto>>{
        const result = await this.messageService.createMessage(dto, username);
        return ApiResponse.success<GetMessageDto>(result);
    }

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
