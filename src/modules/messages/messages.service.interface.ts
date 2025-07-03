import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessageDto } from "./dto/get-message.dto";
import { PaginationDto } from '@/common/dto/pagination.dto';
export interface IMessagesService{
    create(dto: CreateMessageDto): Promise<GetMessageDto>;
    delete(messsage_id: string): Promise<GetMessageDto>
    paginate(page: number, limit: number): Promise<PaginationDto<GetMessageDto>>
}