import { config } from 'dotenv';
import * as fs from 'fs/promises';
import { Repository} from 'typeorm';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Files } from './entities/files.entity';
import { GetFileDto } from './dto/response/get-file.dto';
import { CreateFileDto } from './dto/request/create-file.dto';
import { FileException } from './enums/file-exception';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { FileParam } from './dto/request/file-param.dto';
config();
@Injectable()
export class FilesService{
    constructor(
    @InjectRepository(Files)
        private readonly imageRepo: Repository<Files>
    ) {}

    async getPaginateFiles(query: FileParam): Promise<PaginationDto<GetFileDto>>{
        const { page = 1, limit = 10, search } = query;
        const qb = this.imageRepo.createQueryBuilder('image');
        
        if (search) {
            qb.andWhere(
                `image.originalName LIKE N'%' + :search + '%'`,
                { search },
            );
        }
        qb.orderBy('image.created_at', 'DESC').skip((page - 1) * limit).take(limit);
        const [items, total] = await qb.getManyAndCount();
        const data = plainToInstance(GetFileDto, items, {
            excludeExtraneousValues: true,
        });
        const res = new PaginationDto<GetFileDto>({
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        });
        return res;    
    }

    async searchFile(query: string): Promise<GetFileDto[]> {
        const qb = this.imageRepo.createQueryBuilder('file');

        if (query && query.trim() !== '') {
            const searchTerm = `%${query.trim()}%`;

            qb.where('file.id LIKE :search', { search: searchTerm })
            .orWhere('file.originalName LIKE :search', { search: searchTerm });
        }

        const data = await qb.getMany();

        return plainToInstance(GetFileDto, data, {
            excludeExtraneousValues: true,
        });
    }

    async uploadFile(file: CreateFileDto, username: string): Promise<GetFileDto>{
        let image;
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const path = `/uploads/${year}/${month}/${day}/${file.originalName}`;
        const url =  process.env.WEB_HOST + path;
        if(!file.memberId){
            image = this.imageRepo.create({ 
                originalName: file.originalName,
                url: url,
                createdAt: new Date(),
                createdBy: username            
            });
        }else{
            image = this.imageRepo.create({ 
                originalName: file.originalName,
                url: url,
                memberId: file.memberId,
                createdAt: new Date(),
                createdBy: username            
            });
        }
        const saved = await this.imageRepo.save(image);
        return plainToInstance(GetFileDto, saved, {
            excludeExtraneousValues: true,
        });
    }


    async deleteFile(fileId: string): Promise<void> {
        // Tìm file trong CSDL
        const file = await this.imageRepo.findOne({ where: { id: fileId } });
        if (!file) {
            throw new NotFoundException(FileException.FILE_NOT_FOUND);
        }
        if(process.env.WEB_HOST){
            // Lấy đường dẫn file từ URL
            const filePath = file.url.replace(process.env.WEB_HOST, '.');
            try {
                await fs.unlink(filePath);
            } catch (error: any) {
                if (error.code === 'ENOENT') {
                    throw new NotFoundException(FileException.FILE_NOT_FOUND);
                } 
                else {
                    throw new InternalServerErrorException(FileException.DELETE_FILE_ERROR);
                }
            }
            // Xóa bản ghi trong CSDL
            await this.imageRepo.delete(fileId);
        }
    }
}
