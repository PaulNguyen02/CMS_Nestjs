import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { followUs } from './entities/follow-us.entity';
import { FollowUsV1Controller } from './v1/follow-us.controller';
import { FollowUsV2Controller } from './v2/follow-us.controller';
import { FollowUsService } from './follow-us.service';

@Module({
  imports:[TypeOrmModule.forFeature([followUs])],
  controllers: [FollowUsV1Controller, FollowUsV2Controller],
  providers: [FollowUsService]
})
export class FollowUsModule {}
