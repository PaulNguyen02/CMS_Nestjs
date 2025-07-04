import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports:[TypeOrmModule.forFeature([Files])],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
