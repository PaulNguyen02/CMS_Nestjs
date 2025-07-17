import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import { Injectable, NotFoundException } from '@nestjs/common';
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
        let image;
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const url = `https://localhost:3001/uploads/${year}/${month}/${day}/${file.originalName}`;
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
        throw new NotFoundException(`File with ID ${fileId} not found`);
        }
        // Lấy đường dẫn file từ URL
        const filePath = file.url.replace('https://localhost:3001', '.');
        try {
            // Xóa file vật lý
            await fs.unlink(filePath);
        } catch (error) {
            // Nếu file không tồn tại trong thư mục, vẫn tiếp tục xóa bản ghi trong CSDL
            console.warn(`File not found on disk: ${filePath}`);
        }
        // Xóa bản ghi trong CSDL
        await this.imageRepo.delete(fileId);
  }
}
