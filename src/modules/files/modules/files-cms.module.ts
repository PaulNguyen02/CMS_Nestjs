import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from '../entities/files.entity';
import { FilesCMSController } from '../controllers/files-cms.controller';
import { FilesService } from '../files.service';

@Module({
  imports:[TypeOrmModule.forFeature([Files])],
  controllers: [FilesCMSController],
  providers: [FilesService]
})
export class FilesCMSModule {}
