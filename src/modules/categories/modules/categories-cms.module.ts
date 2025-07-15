import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { CategoriesCMSController } from '../controllers/categories-cms.controller';
import { CategoriesService } from '../categories.service';

@Module({
  imports:[TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesCMSController],
  providers: [CategoriesService]
})
export class CategoriesCMSModule {}
