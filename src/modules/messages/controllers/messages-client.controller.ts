import { 
    Controller,
    Post, 
    Body, 
} from '@nestjs/common';
import { MessagesService } from '../messages.service';
import { GetMessageDto } from '../dto/get-message.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ApiResponse } from '@/common/response/api-response';
import { Public } from '@/common/decorators/public.decorator';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('messages')
export class MessagesClientController {
    constructor(private readonly messageService: MessagesService) {}
    
    @Public()
    @Post()
    async createMessage(
        @Body() dto: CreateMessageDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMessageDto>>{
        const result = await this.messageService.createMessage(dto, username);
        return ApiResponse.success<GetMessageDto>(result);
    }

}
