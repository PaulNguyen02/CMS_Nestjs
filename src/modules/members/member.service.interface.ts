import { GetMemberDto } from './dto/get-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
export interface IMemberService {
    create(dto: CreateMemberDto): Promise<GetMemberDto>;
    update (member_id: string, dto: UpdateMemberDto): Promise<GetMemberDto>
    get(): Promise<GetMemberDto[]>
    findOne(member_id: string): Promise<GetMemberDto>
    delete(member_id: string): Promise<GetMemberDto>
    paginate(page: number, limit: number): Promise<PaginationDto<GetMemberDto>>
}