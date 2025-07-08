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

    async createPartner(dto: CreatePartnerDto): Promise<GetPartnerDto>{
        const newPartner = await this.partnerRepository.create({
            name: dto.title,
            url: dto.url,
            fileId: dto.fileId,
            createdAt: new Date(),
            createdBy: dto.createdBy 
        });
        const saved = await this.partnerRepository.save(newPartner);
        const res = plainToInstance(GetPartnerDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async updatePartner(partnerId: string, dto: UpdatePartnerDto): Promise<GetPartnerDto>{
        const existedPartner = await this.partnerRepository.findOne({
            where: { id: partnerId }
        });       
        if (!existedPartner) {
            throw new NotFoundException('Partner not found');
        }
        const newPartner = plainToInstance(Partners, dto);
        const update = this.partnerRepository.merge(existedPartner,newPartner);
        const savedPartner = await this.partnerRepository.save(update);
        const res = plainToInstance(GetPartnerDto, savedPartner, {
            excludeExtraneousValues: true,
        });

        return res;
    }

    async getPartner(): Promise<GetPartnerDto[]>{
        const cached = await this.cacheManager.get<GetPartnerDto[]>('partners/all');
        if(cached){
            return cached;
        }
        const partners = await this.partnerRepository.find({relations: ['file']});
        const res = plainToInstance(GetPartnerDto, partners, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('partners/all', res, 60);
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
        qb.orderBy('partner.created_at', 'DESC');

        const allPartners = await qb.getMany(); 
        const total = allPartners.length;
        const start = (page - 1) * limit;
        const paginatedPartners = allPartners.slice(start, start + limit);
        const data = plainToInstance(GetPartnerDto, paginatedPartners, {
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
