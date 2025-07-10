import {
    Inject, 
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { Cache, 
    CACHE_MANAGER 
} from '@nestjs/cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { GetInformationDto } from './dto/get-information.dto';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { ContactInformationParam } from './dto/contact-information-param.dto';
import { contactInformation } from './entities/contact-information.entity';
@Injectable()
export class ContactInformationService {

    constructor(
            @InjectRepository(contactInformation)
            private readonly contactRepository: Repository<contactInformation>,
            @Inject(CACHE_MANAGER) 
            private cacheManager: Cache
    ) {}

    async createInformation(dto: CreateInformationDto, username: string): Promise<GetInformationDto>{
        const contactInfo = await this.contactRepository.create({
            key: dto.key,
            value: dto.value,
            createdAt: new Date(),
            createdBy: username 
        });
        const saved = await this.contactRepository.save(contactInfo);
        const res = plainToInstance(GetInformationDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    };

    async updateInformation (informationId: string, dto: UpdateInformationDto, username: string): Promise<GetInformationDto>{
        await this.contactRepository.update(informationId, {
            ...dto,
            createdAt: new Date(),
            createdBy: username
        });
        const updatedContact = await this.contactRepository.findOne({
            where: { id: informationId }
        });
        const res = plainToInstance(GetInformationDto, updatedContact, {
                excludeExtraneousValues: true,
        });
        return res;
    }

    async getInformation(query: ContactInformationParam): Promise<GetInformationDto[]>{
        const {search} = query;
        const cacheKey = `information${search ? `:${search}` : ''}`;
        const cached = await this.cacheManager.get<GetInformationDto[]>(cacheKey);
        if (cached) {
            return cached;
        }
        const qb = this.contactRepository
            .createQueryBuilder('information');

        if (search) {
            qb.andWhere(
                'information.key LIKE :search',
                { search: `%${search}%` },
            );
        }
        const data = await qb.getMany();
        const res = plainToInstance(GetInformationDto, data, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set(cacheKey, res, 60);
        return res;
    }

    async deleteInformation(informationId: string): Promise<GetInformationDto>{
        const contactInformation = await this.contactRepository.findOne({ where: { id: informationId } });
        
        if (!contactInformation) {
            throw new NotFoundException(`User with ID ${informationId} not found`);
        }
        
        const delete_information = await this.contactRepository.remove(contactInformation); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetInformationDto, delete_information,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
