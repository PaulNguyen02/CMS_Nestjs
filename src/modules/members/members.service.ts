import {
    Inject, 
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from './entities/members.entity';
import { GetMemberDto } from './dto/get-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { IMemberService } from './member.service.interface';
@Injectable()
export class MembersService implements IMemberService{

    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async create(dto: CreateMemberDto): Promise<GetMemberDto>{
        const member = await this.memberRepository.create({
            fullname: dto.fullname,
            slug: dto.slug,
            position: dto.position,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.memberRepository.save(member);
        const res = plainToInstance(GetMemberDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async update (member_id: string, dto: UpdateMemberDto): Promise<GetMemberDto>{
        const existedMember = await this.memberRepository.findOne({
            where: { id: member_id }
        });       
        if (!existedMember) {
            throw new NotFoundException('Member not found');
        }
        const newMember = plainToInstance(Member, dto);
        const update = this.memberRepository.merge(existedMember,newMember);
        const savedMember = await this.memberRepository.save(update);
        const res = plainToInstance(GetMemberDto, savedMember, {
            excludeExtraneousValues: true,
        });        
        return res;
    }

    async get(): Promise<GetMemberDto[]>{
        const cached = await this.cacheManager.get<GetMemberDto[]>('member/all');
        if(cached){
            return cached;
        }
        const members = await this.memberRepository.find({ relations: ['files', 'working_history'] });
        const res = plainToInstance(GetMemberDto, members, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('member/all', res, 60);
        return res;
    }

    async paginate(page: number, limit: number): Promise<PaginationDto<GetMemberDto>>{
        const cached = await this.cacheManager.get<PaginationDto<GetMemberDto>>('member');
        if(cached){
            return cached;
        }
        const [posts, total] = await this.memberRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            relations:[
                'files', 
                'working_history'
            ],
            order: { created_at: 'DESC' }, // nếu có field createdAt
        });

        const data = plainToInstance(GetMemberDto, posts, {
            excludeExtraneousValues: true,
        });

        const res = new PaginationDto<GetMemberDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        await this.cacheManager.set('member', res, 60);
        return res;
    }

    async findOne(member_id: string): Promise<GetMemberDto>{
        const existedMember = await this.memberRepository.findOne({
            where: { id: member_id }
        });  
        const res = plainToInstance(GetMemberDto, existedMember, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async delete(member_id: string): Promise<GetMemberDto>{
        const member = await this.memberRepository.findOne({ where: { id: member_id } });        
        if (!member) {
            throw new NotFoundException(`User with ID ${member_id} not found`);
        }        
        const delete_member = await this.memberRepository.remove(member); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMemberDto, delete_member,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
