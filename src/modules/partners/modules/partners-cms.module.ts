import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partners } from '../entities/partners.entity';
import { PartnersService } from '../partners.service';
import { PartnersCMSController } from '../controllers/partners-cms.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Partners])],
  controllers: [PartnersCMSController],
  providers: [PartnersService]
})
export class PartnersCMSModule {}
