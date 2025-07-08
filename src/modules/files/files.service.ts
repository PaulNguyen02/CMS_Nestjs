import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Files } from './entities/files.entity';
import { GetFileDto } from './dto/get-file.dto';
import { CreateFileDto } from './dto/create-file.dto';
@Injectable()
export class FilesService{
    constructor(
    @InjectRepository(Files)
        private readonly imageRepo: Repository<Files>
    ) {}

    async uploadFile(file: CreateFileDto): Promise<GetFileDto>{
        const url = `https://localhost:3001/localhost/uploads/${file.originalName}`;
        const image = this.imageRepo.create({ 
            originalName: file.originalName,
            url: url,
            memberId: file.memberId,
            createdAt: new Date(),
            createdBy: file.createdBy            
        });
        const saved = await this.imageRepo.save(image);
        return plainToInstance(GetFileDto, saved, {
            excludeExtraneousValues: true,
        });
    }
}
