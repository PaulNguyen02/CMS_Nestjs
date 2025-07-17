import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/members.entity';
import { WorkingHistory } from '../entities/working-history.entity';
import { MembersService } from '../members.service';
import { MembersCMSController } from '../controllers/members-cms.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Member, WorkingHistory])],
  controllers: [MembersCMSController],
  providers: [MembersService]
})
export class MemberCMSModule {}
