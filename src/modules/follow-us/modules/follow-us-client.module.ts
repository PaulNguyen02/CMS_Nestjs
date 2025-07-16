import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { followUs } from '../entities/follow-us.entity';
import { FollowUsClientController } from '../controllers/follow-us-client.controller';
import { FollowUsService } from '../follow-us.service';

@Module({
  imports:[TypeOrmModule.forFeature([followUs])],
  controllers: [FollowUsClientController],
  providers: [FollowUsService]
})
export class FollowUsClientModule {}
