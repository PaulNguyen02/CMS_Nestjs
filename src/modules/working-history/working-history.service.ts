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
import { WorkingHistory } from './entities/working-history.entity';
import { GetWorkingHistoryDto } from './dto/get-workinghistory.dto';
import { UpdateWorkingHistoryDto } from './dto/update-workinghistory.dto';
@Injectable()
export class WorkingHistoryService {
    
    constructor(
        @InjectRepository(WorkingHistory)
        private readonly historyRepository: Repository<WorkingHistory>,
    ) {}


    async updateWorkingHistory(workingHistoryId: string, dto: UpdateWorkingHistoryDto): Promise<GetWorkingHistoryDto>{
        const existedWorkingHistory = await this.historyRepository.findOne({
            where: { id: workingHistoryId }
        });       
        if (!existedWorkingHistory) {
            throw new NotFoundException('Không tìm thấy thông tin');
        }
        const newWorkingHistory = plainToInstance(WorkingHistory, dto);
        const update = this.historyRepository.merge(existedWorkingHistory, newWorkingHistory);
        const saved_wh = await this.historyRepository.save(update);
        const res = plainToInstance(GetWorkingHistoryDto, saved_wh, {
            excludeExtraneousValues: true,
        });        
        return res;
    }


    async deleteWorkingHistory(workingHistoryId: string): Promise<GetWorkingHistoryDto>{
        const workingHistory = await this.historyRepository.findOne({ where: { id: workingHistoryId } });        
        if (!workingHistory) {
            throw new NotFoundException(`User with ID ${workingHistoryId} not found`);
        }        
        const deleteWorkingHistory = await this.historyRepository.remove(workingHistory); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetWorkingHistoryDto, deleteWorkingHistory,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
