import {
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { followUs } from './entities/follow-us.entity';
import { GetFollowUsDto } from './dto/response/get-follow-us.dto';
import { CreateFollowUsDto } from './dto/request/create-follow-us.dto';
import { FollowUsParam } from './dto/request/follow-us-param.dto';
import { FollowUsExceptions } from './enums/follow-us-exceptions';
@Injectable()
export class FollowUsService{
    constructor(
        @InjectRepository(followUs)
        private readonly followRepository: Repository<followUs>
    ) {}

    async getFollowUs(query: FollowUsParam): Promise<GetFollowUsDto[]>{
        const {search} = query;
        const qb = this.followRepository
            .createQueryBuilder('follow')
            .leftJoinAndSelect('follow.file', 'file')
        if (search) {
            qb.andWhere(
                `follow.name LIKE N'%' + :search + '%'`,
                { search },
            );
        }
        const followUs = await qb.getMany();
        const res = plainToInstance(GetFollowUsDto, followUs, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async createFollowUs(dto: CreateFollowUsDto, username: string): Promise<GetFollowUsDto>{
        try{
            const newFollow = await this.followRepository.create({
                name: dto.name,
                url: dto.url,
                fileId: dto.fileId,
                createdAt: new Date(),
                createdBy: username 
            });
            const saved = await this.followRepository.save(newFollow);
            const res = plainToInstance(GetFollowUsDto, saved, {
                excludeExtraneousValues: true,
            });
            return res;
        }catch{
            throw new NotFoundException(FollowUsExceptions.DUPLICATE_IMG);
        }
    }

    async deleteFollowUs(follow_us_id: string): Promise<GetFollowUsDto>{
        const followUs = await this.followRepository.findOne({ where: { id: follow_us_id } });
        if (!followUs) {
            throw new NotFoundException(FollowUsExceptions.FOLLOW_US_NOT_FOUND);
        }
        const delete_follow_us = await this.followRepository.remove(followUs); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetFollowUsDto, delete_follow_us,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
