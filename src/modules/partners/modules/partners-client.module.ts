import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partners } from '../entities/partners.entity';
import { PartnersService } from '../partners.service';
import { PartnersClientController } from '../controllers/partners-client.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Partners])],
  controllers: [PartnersClientController],
  providers: [PartnersService]
})
export class PartnersClientModule {}
