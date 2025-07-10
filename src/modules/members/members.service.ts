import {
    Inject, 
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import slugify from 'slugify';
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

    async createMember(dto: CreateMemberDto, username: string): Promise<GetMemberDto>{
        const slug = slugify(dto.fullName, {
            lower: true,       // chữ thường
            strict: true       // loại bỏ ký tự đặc biệt
        });
        const member = await this.memberRepository.create({
            fullName: dto.fullName,
            position: dto.position,
            slug: slug,
            createdAt: new Date(),
            createdBy: username,

            workingHistory: dto.workingHistory.map(history => ({
                ...history,
                createdAt: new Date(),
                createdBy: username,
            })),
        });
        const saved = await this.memberRepository.save(member);
        const res = plainToInstance(GetMemberDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updateMember(memberId: string, dto: UpdateMemberDto, username: string): Promise<GetMemberDto>{
        if(dto.fullName){
            const slug = slugify(dto.fullName, {
                lower: true,      
                strict: true       
            });
            await this.memberRepository.update(memberId, {
                ...dto,
                slug: slug,
                createdAt: new Date(),
                createdBy: username
            });
        }
        const updatedMember = await this.memberRepository.findOne({
            where: { id: memberId }
        });
        const res = plainToInstance(GetMemberDto, updatedMember, {
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
        qb.orderBy('member.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        const data = plainToInstance(GetMemberDto, items, {
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
