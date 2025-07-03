import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partners } from './entities/partners.entity';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Partners])],
  controllers: [PartnersController],
  providers: [PartnersService]
})
export class PartnersModule {}
