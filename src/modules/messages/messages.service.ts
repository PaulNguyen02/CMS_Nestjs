import { 
    Inject, 
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { 
    Cache, 
    CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Messages } from './entities/messages.entity';
import { GetMessageDto } from "./dto/get-message.dto";
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { MessageParam } from './dto/message-param.dto';
@Injectable()
export class MessagesService{

    constructor(
        @InjectRepository(Messages)
        private readonly messageRepository: Repository<Messages>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async createMessage(dto: CreateMessageDto, username: string): Promise<GetMessageDto>{
        const newMessage = await this.messageRepository.create({
            fullName: dto.fullName,
            phoneNumber: dto.phoneNumber,
            email: dto.email,
            content: dto.content,
            createdAt: new Date(),
            createdBy: dto.fullName 
        });
        const saved = await this.messageRepository.save(newMessage);
        const res = plainToInstance(GetMessageDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    };

    async getPaginateMessage(query: MessageParam): Promise<PaginationDto<GetMessageDto>>{
        const { page = 1, limit = 10, search } = query;

        const qb = this.messageRepository.createQueryBuilder('message');

        if (search) {
            qb.andWhere(
                'message.fullname LIKE :search OR message.email LIKE :search OR message.phone_number',
                { search: `%${search}%` },
            );
        }
        qb.orderBy('message.created_at', 'DESC').skip((page-1)*limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        const data = plainToInstance(GetMessageDto, items, {
            excludeExtraneousValues: true,
        });
        const res = new PaginationDto<GetMessageDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        return res;               
    }

    async deleteMessage(messsageId: string): Promise<GetMessageDto>{
        const message = await this.messageRepository.findOne({ where: { id: messsageId } });
        
        if (!message) {
            throw new NotFoundException(`User with ID ${messsageId} not found`);
        }
        
        const deleteMessage = await this.messageRepository.remove(message); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMessageDto, deleteMessage,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
