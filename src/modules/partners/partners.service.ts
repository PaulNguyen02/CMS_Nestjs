import {
    Inject, 
    Injectable, 
    NotFoundException 
} from '@nestjs/common';
import {
    Cache, 
    CACHE_MANAGER
} from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Partners } from './entities/partners.entity';
import { GetPartnerDto } from './dto/get-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PartnerParam } from './dto/partner-param.dto';
@Injectable()
export class PartnersService{

    constructor(
        @InjectRepository(Partners)
        private readonly partnerRepository: Repository<Partners>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async createPartner(dto: CreatePartnerDto, username: string): Promise<GetPartnerDto>{
        const newPartner = await this.partnerRepository.create({
            name: dto.title,
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
    
    async getPaginatePartner(query: PartnerParam): Promise<PaginationDto<GetPartnerDto>>{
        const { page = 1, limit = 10, search } = query;
        const qb = this.partnerRepository.createQueryBuilder('partner');

        if (search) {
            qb.andWhere(
                'partner.name LIKE :search',
                { search: `%${search}%` },
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


    async deletePartner(partnerId: string): Promise<GetPartnerDto>{
        const partner = await this.partnerRepository.findOne({ where: { id: partnerId } });

        if (!partner) {
            throw new NotFoundException(`User with ID ${partnerId} not found`);
        }

        const delete_partner = await this.partnerRepository.remove(partner); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetPartnerDto, delete_partner,{
            excludeExtraneousValues: true,
        })
        return res;        
    }
}
