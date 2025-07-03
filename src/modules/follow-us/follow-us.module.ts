import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { followUs } from './entities/follow-us.entity';
import { FollowUsController } from './follow-us.controller';
import { FollowUsService } from './follow-us.service';

@Module({
  imports:[TypeOrmModule.forFeature([followUs])],
  controllers: [FollowUsController],
  providers: [FollowUsService]
})
export class FollowUsModule {}
