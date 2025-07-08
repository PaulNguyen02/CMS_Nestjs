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
@Injectable()
export class FollowUsService{
    constructor(
        @InjectRepository(followUs)
        private readonly followRepository: Repository<followUs>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async createFollowUs(dto: CreateFollowusDto): Promise<GetFollowusDto>{
        const newFollow = await this.followRepository.create({
            name: dto.name,
            url: dto.url,
            fileId: dto.fileId,
            createdAt: new Date(),
            createdBy: dto.createdBy 
        });
        const saved = await this.followRepository.save(newFollow);
        const res = plainToInstance(GetFollowusDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async getFollowUs(): Promise<GetFollowusDto[]>{
        const cached = await this.cacheManager.get<GetFollowusDto[]>('follow');
        if(cached){
            return cached;
        }
        const followUs = await this.followRepository.find({ relations: ['file'] });
        const res = plainToInstance(GetFollowusDto, followUs, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('follow', res, 60);
        return res;
    }

    async deleteFollowUs(follow_us_id: string): Promise<GetFollowusDto>{
        const followUs = await this.followRepository.findOne({ where: { id: follow_us_id } });
        if (!followUs) {
            throw new NotFoundException(`User with ID ${follow_us_id} not found`);
        }
        const delete_follow_us = await this.followRepository.remove(followUs); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetFollowusDto, delete_follow_us,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
