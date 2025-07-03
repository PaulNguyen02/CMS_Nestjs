import { GetPartnerDto } from "./dto/get-partner.dto";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";
import { PaginationDto } from "@/common/dto/pagination.dto";
export interface IPartnersService{
    create(dto: CreatePartnerDto): Promise<GetPartnerDto>;
    update (partner_id: string, dto: UpdatePartnerDto): Promise<GetPartnerDto>
    get(): Promise<GetPartnerDto[]>
    delete(partner_id: string): Promise<GetPartnerDto>
    paginate(page: number, limit: number): Promise<PaginationDto<GetPartnerDto>>
}