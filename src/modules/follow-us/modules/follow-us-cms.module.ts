import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { followUs } from '../entities/follow-us.entity';
import { FollowUsCMSController } from '../controllers/follow-us-cms.controller';
import { FollowUsService } from '../follow-us.service';

@Module({
  imports:[TypeOrmModule.forFeature([followUs])],
  controllers: [FollowUsCMSController],
  providers: [FollowUsService]
})
export class FollowUsCMSModule {}
