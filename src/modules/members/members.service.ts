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
import { MemberParam } from './dto/member-param.dto';
@Injectable()
export class MembersService{

    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>
    ) {}

    async createMember(dto: CreateMemberDto): Promise<GetMemberDto>{
        const member = await this.memberRepository.create({
            fullName: dto.fullName,
            slug: dto.slug,
            position: dto.position,
            createdAt: new Date(),
            createdBy: dto.createdBy,

            workingHistory: dto.workingHistory.map(history => ({
                ...history,
                createdAt: new Date(),
                createdBy: dto.createdBy,
            })),
        });
        const saved = await this.memberRepository.save(member);
        const res = plainToInstance(GetMemberDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updateMember(memberId: string, dto: UpdateMemberDto): Promise<GetMemberDto>{
        const existedMember = await this.memberRepository.findOne({
            where: { id: memberId }
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

    async getPaginateMember(query: MemberParam): Promise<PaginationDto<GetMemberDto>>{
        const { page = 1, limit = 10, search } = query;

        const qb = this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.files', 'files')
            .leftJoinAndSelect('member.workingHistory', 'workingHistory')
        if (search) {
            qb.andWhere(
                'member.fullname LIKE :search OR member.position LIKE :search',
                { search: `%${search}%` },
            );
        }

        qb.orderBy('member.created_at', 'DESC');

        const allMembers = await qb.getMany(); 

        const total = allMembers.length;
        const start = (page - 1) * limit;
        const paginatedMembers = allMembers.slice(start, start + limit);
        const data = plainToInstance(GetMemberDto, paginatedMembers, {
            excludeExtraneousValues: true,
        });
        const res = new PaginationDto<GetMemberDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        return res;        
    }

    async findMemberbyId(memberId: string): Promise<GetMemberDto>{
        const existedMember = await this.memberRepository.findOne({
            where: { id: memberId },
            relations:[
                'files', 
                'working_history'
            ],
        });  
        const res = plainToInstance(GetMemberDto, existedMember, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async deleteMember(memberId: string): Promise<GetMemberDto>{
        const member = await this.memberRepository.findOne({ where: { id: memberId } });        
        if (!member) {
            throw new NotFoundException(`User with ID ${memberId} not found`);
        }        
        const delete_member = await this.memberRepository.remove(member); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetMemberDto, delete_member,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
