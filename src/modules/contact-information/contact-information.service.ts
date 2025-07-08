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
import { contactInformation } from './entities/contact-information.entity';
@Injectable()
export class ContactInformationService {

    constructor(
            @InjectRepository(contactInformation)
            private readonly contactRepository: Repository<contactInformation>,
            @Inject(CACHE_MANAGER) 
            private cacheManager: Cache
    ) {}

    async createInformation(dto: CreateInformationDto): Promise<GetInformationDto>{
        const contactInfo = await this.contactRepository.create({
            key: dto.key,
            value: dto.value,
            createdAt: new Date(),
            createdBy: dto.createdBy 
        });
        const saved = await this.contactRepository.save(contactInfo);
        const res = plainToInstance(GetInformationDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    };

    async updateInformation (informationId: string, dto: UpdateInformationDto): Promise<GetInformationDto>{
        const existedInformation = await this.contactRepository.findOne({
            where: { id: informationId }
        });       
        if (!existedInformation) {
            throw new NotFoundException('existed information not found');
        }
        const newInfo = plainToInstance(contactInformation, dto);
        const update = this.contactRepository.merge(existedInformation,newInfo);
        const savedInfo = await this.contactRepository.save(update);
        const res = plainToInstance(GetInformationDto, savedInfo, {
            excludeExtraneousValues: true,
        });        
        return res;
    }

    async getInformation(): Promise<GetInformationDto[]>{
        const cached = await this.cacheManager.get<GetInformationDto[]>('information');
        if(cached){
            return cached;
        }
        const contactInformation = await this.contactRepository.find();
        const res = plainToInstance(GetInformationDto, contactInformation, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('information', res, 60);
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
