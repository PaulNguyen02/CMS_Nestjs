import {
    BadRequestException,
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { slugString } from '@/common/utils/string.util';
import { Repository, DataSource} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from './entities/members.entity';
import { WorkingHistory } from './entities/working-history.entity';
import { GetMemberDto } from './dto/member-response/get-member.dto';
import { CreateMemberDto } from './dto/member-request/create-member.dto';
import { UpdateMemberDto } from './dto/member-request/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { MemberParam } from './dto/member-request/member-param.dto';
import { MembersExceptions } from './enums/members-exceptions';
import { Category } from './enums/category';
@Injectable()
export class MembersService{

    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        @InjectRepository(WorkingHistory)
        private readonly workingHistoryRepository: Repository<WorkingHistory>,
        private readonly dataSource: DataSource,
    ) {}

    async getPaginateMember(query: MemberParam): Promise<PaginationDto<GetMemberDto>>{
        const { page = 1, limit = 10, search } = query;

        const qb = this.memberRepository.createQueryBuilder('member')
        .leftJoinAndSelect('member.imageFile', 'imageFile')
        if (search) {
            qb.andWhere(`member.fullName LIKE N'%' + :search + '%'`, { search })
            .orWhere(`member.position LIKE N'%' + :search + '%'`, { search });
        }
        qb.orderBy('member.createdAt', 'DESC').skip((page - 1) * limit).take(limit);
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

    async searchMember(search: string): Promise<GetMemberDto[]> {
        const qb = this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.imageFile', 'imageFile')   
        if (search && search.trim() !== '') {
            qb.where('member.id LIKE :id', { id: `%${search}%` })
            .orWhere(`member.fullName LIKE N'%' + :search + '%'`, { search });
        }
            
        const data = await qb.getMany();
            
        const res = plainToInstance(GetMemberDto, data, {
            excludeExtraneousValues: true,
        });
        
        return res;
    }

    async getDetailMember(id: string): Promise<GetMemberDto>{
        const qb = this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.imageFile', 'imageFile')
            .leftJoinAndSelect('member.workingHistory', 'workingHistory')
            .where('member.id = :id', { id })
        const item = await qb.getOne()
        const data = plainToInstance(GetMemberDto, item, {
            excludeExtraneousValues: true,
        });
        return data;        
    }

    async getDetailMemberbySlug(slug: string): Promise<GetMemberDto>{
        const qb = this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.imageFile', 'imageFile')
            .leftJoinAndSelect('member.workingHistory', 'workingHistory')
            .where('member.slug = :slug', { slug })
        const item = await qb.getOne()
        const data = plainToInstance(GetMemberDto, item, {
            excludeExtraneousValues: true,
        });
        return data;        
    }

    async createMember(dto: CreateMemberDto, username: string): Promise<GetMemberDto>{
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const slug = slugString(dto.fullName);
            const existingSlug = await this.memberRepository.findOne({where:{slug}});
            if(existingSlug){
                throw new BadRequestException(MembersExceptions.SLUG_ALREADY_EXISTING);
            }  
            const imageId = dto.imageId;
            const existingImage = await this.memberRepository.findOne({where: { imageId }});
            if (existingImage) {
                throw new BadRequestException(MembersExceptions.IMAGE_ALREADY_EXISTING);
            }            
            const member = queryRunner.manager.create(Member, {
                fullName: dto.fullName,
                position: dto.position,
                imageId: imageId,
                slug: slug,
                createdAt: new Date(),
                createdBy: username,
                workingHistory: dto.workingHistory.map((history) => ({
                    ...history,
                    categories: history.categories ? Category.PROJECT : Category.EXPERIENCE,
                    createdAt: new Date(),
                    createdBy: username,
                })),
            });

            const saved = await queryRunner.manager.save(member);
            await queryRunner.commitTransaction(); 
            return plainToInstance(GetMemberDto, saved, {
                excludeExtraneousValues: true,
            });
        } catch (err) {
            await queryRunner.rollbackTransaction(); 
            throw err;
        } finally {
            await queryRunner.release(); 
        }
    }

    async updateMember(memberId: string, dto: UpdateMemberDto, username: string): Promise<GetMemberDto> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const memberRepo = queryRunner.manager.getRepository(Member);
            const workingHistoryRepo = queryRunner.manager.getRepository(WorkingHistory);
            const member = await memberRepo.findOne({
                where: { id: memberId },
                relations: ['workingHistory'],
            });
            if (!member) {
                throw new NotFoundException(MembersExceptions.MEMBER_NOT_FOUND);
            }

            Object.assign(member, {
                fullName: dto.fullName,
                position: dto.position,
                imageId: dto.imageId,
                slug: dto.fullName ? slugString(dto.fullName) : member.slug,
                createdAt: new Date(),
                createdBy: username,
            });

            if (dto.workingHistory) {
                const currentHistories = member.workingHistory || [];

                if (currentHistories.length > 0) {
                    await workingHistoryRepo.delete(currentHistories.map(h => h.id));
                    member.workingHistory = [];
                }

                const newHistories = dto.workingHistory.map((history) =>
                    workingHistoryRepo.create({
                        ...history,
                        categories: history.categories ? Category.PROJECT : Category.EXPERIENCE,
                        createdAt: new Date(),
                        createdBy: username,
                        member: member,
                    }),
                );

                await workingHistoryRepo.save(newHistories);
                member.workingHistory = newHistories;
            }

            const savedMember = await memberRepo.save(member);

            await queryRunner.commitTransaction();

            return plainToInstance(GetMemberDto, savedMember, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }        

    async deleteMember(memberId: string): Promise<GetMemberDto>{
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
            relations: ['workingHistory'],
        });

        if (!member) {
            throw new NotFoundException(MembersExceptions.MEMBER_NOT_FOUND);
        }

        const workingHistories = member.workingHistory || [];
        if (workingHistories.length > 0) {
            await this.workingHistoryRepository.remove(workingHistories);
        }

        const deletedMember = await this.memberRepository.remove(member);

        const res = plainToInstance(GetMemberDto, deletedMember, {
            excludeExtraneousValues: true,
        });
        return res;
    }
}
