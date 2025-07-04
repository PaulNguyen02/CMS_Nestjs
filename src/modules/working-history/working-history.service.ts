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
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
@Injectable()
export class WorkingHistoryService {
    
    constructor(
            @InjectRepository(workingHistory)
            private readonly historyRepository: Repository<workingHistory>,
            @Inject(CACHE_MANAGER) 
            private cacheManager: Cache
    ) {}


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
