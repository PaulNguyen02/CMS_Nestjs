import { 
    Controller,
    Post, 
    Body, 
} from '@nestjs/common';
import { MessagesService } from '../messages.service';
import { GetMessageDto } from '../dto/response/get-message.dto';
import { CreateMessageDto } from '../dto/request/create-message.dto';
import { ApiResponse } from '@/common/response/api-response';
import { Public } from '@/common/decorators/public.decorator';

@Controller('messages')
export class MessagesClientController {
    constructor(private readonly messageService: MessagesService) {}
    
    @Public()
    @Post()
    async createMessage(
        @Body() dto: CreateMessageDto,
    ): Promise<ApiResponse<GetMessageDto>>{
        const result = await this.messageService.createMessage(dto);
        return ApiResponse.success<GetMessageDto>(result);
    }

}
