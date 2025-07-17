import {
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { slugString } from '@/common/utils/string.util';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Member } from './entities/members.entity';
import { WorkingHistory } from './entities/working-history.entity';
import { GetMemberDto } from './dto/get-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { MemberParam } from './dto/member-param.dto';
@Injectable()
export class MembersService{

    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        @InjectRepository(WorkingHistory)
        private readonly workingHistoryRepository: Repository<WorkingHistory>,
    ) {}

    async createMember(dto: CreateMemberDto, username: string): Promise<GetMemberDto>{
        const slug = slugString(dto.fullName)
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

    async updateMember(memberId: string, dto: UpdateMemberDto, username: string): Promise<GetMemberDto> 
    {
        // Tìm Member với workingHistory
        const member = await this.memberRepository.findOne({
        where: { id: memberId },
        relations: ['workingHistory'],
        });

        if (!member) {
            throw new NotFoundException(`Không tìm thấy thành viên có ID ${memberId}`);
        }

        // Cập nhật thông tin cơ bản của Member
        const updateData: Partial<Member> = {
            fullName: dto.fullName,
            position: dto.position,
            slug: dto.fullName ? slugString(dto.fullName) : member.slug,
            createdAt: new Date(),
            createdBy: username,
        };
        await this.memberRepository.update(memberId, updateData);

        // Xử lý workingHistory
        if (dto.workingHistory) {
        // Lấy danh sách workingHistory hiện tại
            const currentHistories = member.workingHistory || [];

            // Xóa tất cả workingHistory hiện tại (nếu cần thay thế toàn bộ)
            if (currentHistories.length > 0) {
                await this.workingHistoryRepository.delete(
                currentHistories.map((history) => history.id),
                );
                member.workingHistory = [];
            }

            // Thêm workingHistory mới từ DTO
            const newHistories = dto.workingHistory.map((history) =>
                this.workingHistoryRepository.create({
                ...history,
                createdAt: new Date(),
                createdBy: username,
                member, // Gán quan hệ với Member
                }),
            );
            await this.workingHistoryRepository.save(newHistories);
            member.workingHistory = newHistories;
        }

        // Lưu Member sau khi cập nhật quan hệ
        await this.memberRepository.save(member);

        // Tải lại Member để đảm bảo dữ liệu mới nhất
        const refreshedMember = await this.memberRepository.findOne({
            where: { id: memberId },
            relations: ['workingHistory'],
        });

        // Chuyển sang DTO
        const res = plainToInstance(GetMemberDto, refreshedMember, {
        excludeExtraneousValues: true,
        });
        return res;
    }


    async getPaginateMember(query: MemberParam): Promise<PaginationDto<GetMemberDto>>{
        const { page = 1, limit = 10, search } = query;

        const qb = this.memberRepository.createQueryBuilder('member')
        if (search) {
            qb.andWhere(
                'member.fullName LIKE :search OR member.position LIKE :search',
                { search: `%${search}%` },
            );
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

    async getDetailMember(slug: string): Promise<GetMemberDto>{
        const qb = this.memberRepository
            .createQueryBuilder('member')
            .leftJoinAndSelect('member.files', 'files')
            .leftJoinAndSelect('member.workingHistory', 'workingHistory')
            .where('member.slug = :slug', { slug })
        const item = await qb.getOne()
        const data = plainToInstance(GetMemberDto, item, {
            excludeExtraneousValues: true,
        });
        return data;        
    }

    async deleteMember(memberId: string): Promise<GetMemberDto>{
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
            relations: ['workingHistory'],
        });

        if (!member) {
            throw new NotFoundException(`Không tìm thấy thành viên có ID ${memberId}`);
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
