import {
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Partners } from './entities/partners.entity';
import { GetPartnerDto } from './dto/response/get-partner.dto';
import { UpdatePartnerDto } from './dto/request/update-partner.dto';
import { CreatePartnerDto } from './dto/request/create-partner.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PartnerParam } from './dto/request/partner-param.dto';
import { PartnerException } from './enums/partners-exception';
@Injectable()
export class PartnersService{

    constructor(
        @InjectRepository(Partners)
        private readonly partnerRepository: Repository<Partners>
    ) {}

    async getPaginatePartner(query: PartnerParam): Promise<PaginationDto<GetPartnerDto>>{
        const { page = 1, limit = 10, search } = query;
        const qb = this.partnerRepository.createQueryBuilder('partner');

        if (search) {
            qb.andWhere(
                `partner.name LIKE N'%' + :search + '%'`,
                { search },
            );
        }
        qb.orderBy('partner.created_at', 'DESC').skip((page-1)* limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        
        const data = plainToInstance(GetPartnerDto, items, {
            excludeExtraneousValues: true,
        });
        const res = new PaginationDto<GetPartnerDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        return res;                 
    }

    async createPartner(dto: CreatePartnerDto, username: string): Promise<GetPartnerDto>{
        try{
            const newPartner = await this.partnerRepository.create({
                name: dto.name,
                url: dto.url,
                fileId: dto.fileId,
                createdAt: new Date(),
                createdBy: username 
            });
            const saved = await this.partnerRepository.save(newPartner);
            const res = plainToInstance(GetPartnerDto, saved, {
                excludeExtraneousValues: true,
            });
            return res;
        }catch{
            throw new NotFoundException(PartnerException.DUPLICATE_IMG);
        }
    }

    async updatePartner(partnerId: string, dto: UpdatePartnerDto, username: string): Promise<GetPartnerDto>{
        await this.partnerRepository.update(partnerId, {
            ...dto,
            createdAt: new Date(),
            createdBy: username
        });
        const updatedPartner = await this.partnerRepository.findOne({
            where: { id: partnerId }
        });
        const res = plainToInstance(GetPartnerDto, updatedPartner, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async deletePartner(partnerId: string): Promise<GetPartnerDto>{
        const partner = await this.partnerRepository.findOne({ where: { id: partnerId } });

        if (!partner) {
            throw new NotFoundException(PartnerException.PARTNER_NOT_FOUND);
        }

        const delete_partner = await this.partnerRepository.remove(partner); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetPartnerDto, delete_partner,{
            excludeExtraneousValues: true,
        })
        return res;        
    }
}
