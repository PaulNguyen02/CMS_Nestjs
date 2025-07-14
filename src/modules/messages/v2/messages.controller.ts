import { 
    Controller,
    Post, 
    Body, 
    UseGuards
} from '@nestjs/common';
import { MessagesService } from '../messages.service';
import { GetMessageDto } from '../dto/get-message.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ApiResponse } from '@/common/response/api-response';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(JwtAuthGuard)
@Controller({path: 'messages', version:'2'})
export class MessagesV2Controller {
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
