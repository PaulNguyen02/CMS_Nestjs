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
import { followUs } from './entities/follow-us.entity';
import { GetFollowusDto } from './dto/get-followus.dto';
import { CreateFollowusDto } from './dto/create-followus.dto';
import { IFollowUsService } from './follow-us.service.interface';
@Injectable()
export class FollowUsService implements IFollowUsService{
    constructor(
        @InjectRepository(followUs)
        private readonly followRepository: Repository<followUs>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async create(dto: CreateFollowusDto): Promise<GetFollowusDto>{
        const new_follow = await this.followRepository.create({
            name: dto.name,
            url: dto.url,
            file_id: dto.file_id,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.followRepository.save(new_follow);
        const res = plainToInstance(GetFollowusDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async get(): Promise<GetFollowusDto[]>{
        const cached = await this.cacheManager.get<GetFollowusDto[]>('follow');
        if(cached){
            return cached;
        }
        const follow_us = await this.followRepository.find({ relations: ['file'] });
        const res = plainToInstance(GetFollowusDto, follow_us, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('follow', res, 60);
        return res;
    }

    async delete(follow_us_id: string): Promise<GetFollowusDto>{
        const follow_us = await this.followRepository.findOne({ where: { id: follow_us_id } });
        if (!follow_us) {
            throw new NotFoundException(`User with ID ${follow_us_id} not found`);
        }
        const delete_follow_us = await this.followRepository.remove(follow_us); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetFollowusDto, delete_follow_us,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
