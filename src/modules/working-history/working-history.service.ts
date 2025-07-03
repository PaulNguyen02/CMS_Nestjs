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
import { workingHistory } from './entities/working-history.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { GetWorkingHistoryDto } from './dto/get-workinghistory.dto';
import { CreateWorkingHistoryDto } from './dto/create-workinghistory.dto';
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
import { IWorkingHistoryService } from './working-history.service.interface';
@Injectable()
export class WorkingHistoryService implements IWorkingHistoryService{
    
    constructor(
            @InjectRepository(workingHistory)
            private readonly historyRepository: Repository<workingHistory>,
            @Inject(CACHE_MANAGER) 
            private cacheManager: Cache
    ) {}
    
    async create(dto: CreateWorkingHistoryDto): Promise<GetWorkingHistoryDto>{
        const working_history = await this.historyRepository.create({
            title: dto.title,
            description: dto.description,
            categories: dto.categories,
            memberId: dto.memberId,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.historyRepository.save(working_history);
        const res = plainToInstance(GetWorkingHistoryDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async update (working_history_id: string, dto: UpdateWorkingHistoryDto): Promise<GetWorkingHistoryDto>{
        const existed_working_history = await this.historyRepository.findOne({
            where: { id: working_history_id }
        });       
        if (!existed_working_history) {
            throw new NotFoundException('Working History not found');
        }
        const new_working_history = plainToInstance(workingHistory, dto);
        const update = this.historyRepository.merge(existed_working_history,new_working_history);
        const saved_wh = await this.historyRepository.save(update);
        const res = plainToInstance(GetWorkingHistoryDto, saved_wh, {
            excludeExtraneousValues: true,
        });        
        return res;
    }

    async get(): Promise<GetWorkingHistoryDto[]>{
        const cached = await this.cacheManager.get<GetWorkingHistoryDto[]>('working_history/all');
        if(cached){
            return cached;
        }
        const working_histories = await this.historyRepository.find();
        const res = plainToInstance(GetWorkingHistoryDto, working_histories, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('working_history/all', res, 60);
        return res;
    }

    async paginate(page: number, limit: number): Promise<PaginationDto<GetWorkingHistoryDto>>{
        const cached = await this.cacheManager.get<PaginationDto<GetWorkingHistoryDto>>('working_history');
        if(cached){
            return cached;
        }
        const [posts, total] = await this.historyRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: { created_at: 'DESC' }, // nếu có field createdAt
        });

        const data = plainToInstance(GetWorkingHistoryDto, posts, {
            excludeExtraneousValues: true,
        });

        const res = new PaginationDto<GetWorkingHistoryDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        await this.cacheManager.set('working_history', res, 60);
        return res;        
    }

    async delete(working_history_id: string): Promise<GetWorkingHistoryDto>{
        const working_history = await this.historyRepository.findOne({ where: { id: working_history_id } });        
        if (!working_history) {
            throw new NotFoundException(`User with ID ${working_history_id} not found`);
        }        
        const delete_working_history = await this.historyRepository.remove(working_history); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetWorkingHistoryDto, delete_working_history,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
