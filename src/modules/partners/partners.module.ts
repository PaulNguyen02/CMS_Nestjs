import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partners } from './entities/partners.entity';
import { PartnersService } from './partners.service';
import { PartnersV1Controller } from './v1/partners.controller';
import { PartnersV2Controller } from './v2/partners.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Partners])],
  controllers: [PartnersV1Controller, PartnersV2Controller],
  providers: [PartnersService]
})
export class PartnersModule {}
