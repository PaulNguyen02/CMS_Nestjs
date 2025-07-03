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
import { IInformationService } from './contact-infomation.service.interface';
@Injectable()
export class ContactInformationService implements IInformationService{

    constructor(
            @InjectRepository(contactInformation)
            private readonly contactRepository: Repository<contactInformation>,
            @Inject(CACHE_MANAGER) 
            private cacheManager: Cache
    ) {}

    async create(dto: CreateInformationDto): Promise<GetInformationDto>{
        const contact_info = await this.contactRepository.create({
            key: dto.key,
            value: dto.value,
            created_at: new Date(),
            created_by: dto.created_by 
        });
        const saved = await this.contactRepository.save(contact_info);
        const res = plainToInstance(GetInformationDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    };

    async update (information_id: string, dto: UpdateInformationDto): Promise<GetInformationDto>{
        const existedInformation = await this.contactRepository.findOne({
            where: { id: information_id }
        });       
        if (!existedInformation) {
            throw new NotFoundException('existed information not found');
        }
        const new_info = plainToInstance(contactInformation, dto);
        const update = this.contactRepository.merge(existedInformation,new_info);
        const savedInfo = await this.contactRepository.save(update);
        const res = plainToInstance(GetInformationDto, savedInfo, {
            excludeExtraneousValues: true,
        });        
        return res;
    }

    async get(): Promise<GetInformationDto[]>{
        const cached = await this.cacheManager.get<GetInformationDto[]>('information');
        if(cached){
            return cached;
        }
        const contact_information = await this.contactRepository.find();
        const res = plainToInstance(GetInformationDto, contact_information, {
            excludeExtraneousValues: true,
        });
        await this.cacheManager.set('information', res, 60);
        return res;
    }

    async delete(information_id: string): Promise<GetInformationDto>{
        const contact_information = await this.contactRepository.findOne({ where: { id: information_id } });
        
        if (!contact_information) {
            throw new NotFoundException(`User with ID ${information_id} not found`);
        }
        
        const delete_information = await this.contactRepository.remove(contact_information); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetInformationDto, delete_information,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
