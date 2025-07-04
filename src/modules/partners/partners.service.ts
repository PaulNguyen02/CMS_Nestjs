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
@Injectable()
export class PartnersService{

    constructor(
        @InjectRepository(Partners)
        private readonly partnerRepository: Repository<Partners>,
        @Inject(CACHE_MANAGER) 
        private cacheManager: Cache
    ) {}

    async create(dto: CreatePartnerDto): Promise<GetPartnerDto>{
        const new_partner = await this.partnerRepository.create({
            name: dto.title,
            url: dto.url,
            file_id: dto.file_id,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.partnerRepository.save(new_partner);
        const res = plainToInstance(GetPartnerDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async update (partner_id: string, dto: UpdatePartnerDto): Promise<GetPartnerDto>{
        const existedPartner = await this.partnerRepository.findOne({
            where: { id: partner_id }
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

    async get(): Promise<GetPartnerDto[]>{
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
    
    async paginate(page: number, limit: number): Promise<PaginationDto<GetPartnerDto>>{
        const cached = await this.cacheManager.get<PaginationDto<GetPartnerDto>>('partners');
        if(cached){
            return cached;
        }
        const [posts, total] = await this.partnerRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            relations:[
                'file'
            ],
            order: { created_at: 'DESC' }, // nếu có field createdAt
        });

        const data = plainToInstance(GetPartnerDto, posts, {
            excludeExtraneousValues: true,
        });

        const res = new PaginationDto<GetPartnerDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        await this.cacheManager.set('partners', res, 60);
        return res;        
    }


    async delete(partner_id: string): Promise<GetPartnerDto>{
        const partner = await this.partnerRepository.findOne({ where: { id: partner_id } });

        if (!partner) {
            throw new NotFoundException(`User with ID ${partner_id} not found`);
        }

        const delete_partner = await this.partnerRepository.remove(partner); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetPartnerDto, delete_partner,{
            excludeExtraneousValues: true,
        })
        return res;        
    }
}
