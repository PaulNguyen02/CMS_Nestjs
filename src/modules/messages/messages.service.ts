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
import { IMessagesService } from './messages.service.interface';
@Injectable()
export class MessagesService implements IMessagesService{

    constructor(
        @InjectRepository(Messages)
        private readonly messageRepository: Repository<Messages>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async create(dto: CreateMessageDto): Promise<GetMessageDto>{
        const new_message = await this.messageRepository.create({
            fullname: dto.fullname,
            phone_number: dto.phone_number,
            email: dto.email,
            content: dto.content,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.messageRepository.save(new_message);
        const res = plainToInstance(GetMessageDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    };

    async paginate(page: number, limit: number): Promise<PaginationDto<GetMessageDto>>{
        const cached = await this.cacheManager.get<PaginationDto<GetMessageDto>>('message');
        if(cached){
            return cached;
        }
        const [posts, total] = await this.messageRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: { created_at: 'DESC' }, // nếu có field createdAt
        });

        const data = plainToInstance(GetMessageDto, posts, {
            excludeExtraneousValues: true,
        });

        const res = new PaginationDto<GetMessageDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        await this.cacheManager.set('message', res, 60);
        return res;        
    }

    async delete(messsage_id: string): Promise<GetMessageDto>{
        const message = await this.messageRepository.findOne({ where: { id: messsage_id } });
        
        if (!message) {
            throw new NotFoundException(`User with ID ${messsage_id} not found`);
        }
        
        const delete_message = await this.messageRepository.remove(message); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMessageDto, delete_message,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
