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
        const url = `https://localhost:3001/localhost/uploads/${file.original_name}`;
        const image = this.imageRepo.create({ 
            original_name: file.original_name,
            url: url,
            member_id: file.member_id,
            created_at: new Date(),
            created_by: file.created_by            
        });
        const saved = await this.imageRepo.save(image);
        return plainToInstance(GetFileDto, saved, {
            excludeExtraneousValues: true,
        });
    }
}
