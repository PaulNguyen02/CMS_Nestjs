import { 
    Injectable, 
    NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { GetInformationDto } from './dto/response/get-information.dto';
import { CreateInformationDto } from './dto/request/create-information.dto';
import { UpdateInformationDto } from './dto/request/update-information.dto';
import { ContactInformationParam } from './dto/request/contact-information-param.dto';
import { contactInformation } from './entities/contact-information.entity';
import { InformationExceptions } from './enums/information-exceptions';
@Injectable()
export class ContactInformationService {

    constructor(
        @InjectRepository(contactInformation)
        private readonly contactRepository: Repository<contactInformation>
    ) {}

    async getInformation(query: ContactInformationParam): Promise<GetInformationDto[]>{
        const {search} = query;
        const qb = this.contactRepository.createQueryBuilder('information');
        if (search) {
            qb.andWhere(
                `information.key LIKE N'%' + :search + '%'`,
                { search },
            );
        }
        const data = await qb.getMany();
        const res = plainToInstance(GetInformationDto, data, {
            excludeExtraneousValues: true,
        });
        return res;
    }

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

    async deleteInformation(informationId: string): Promise<GetInformationDto>{
        const contactInformation = await this.contactRepository.findOne({ where: { id: informationId } });
        
        if (!contactInformation) {
            throw new NotFoundException(InformationExceptions.INFORMATION_NOT_FOUND);
        }
        
        const delete_information = await this.contactRepository.remove(contactInformation); // hoặc .softRemove nếu có soft-delete
        const res = plainToInstance(GetInformationDto, delete_information,{
            excludeExtraneousValues: true,
        })
        return res;
    }
}
