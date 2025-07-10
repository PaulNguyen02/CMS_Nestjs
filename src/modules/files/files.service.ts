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

    async uploadFile(file: CreateFileDto, username: string): Promise<GetFileDto>{
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const url = `https://localhost:3001/localhost/uploads/${year}/${month}/${day}/${file.originalName}`;
        const image = this.imageRepo.create({ 
            originalName: file.originalName,
            url: url,
            memberId: file.memberId,
            createdAt: new Date(),
            createdBy: username            
        });
        const saved = await this.imageRepo.save(image);
        return plainToInstance(GetFileDto, saved, {
            excludeExtraneousValues: true,
        });
    }
}
