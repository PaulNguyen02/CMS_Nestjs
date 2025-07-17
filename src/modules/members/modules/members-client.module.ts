import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/members.entity';
import { WorkingHistory } from '@/modules/working-history/entities/working-history.entity';
import { MembersService } from '../members.service';
import { MembersClientController } from '../controllers/members-client.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Member, WorkingHistory])],
  controllers: [MembersClientController],
  providers: [MembersService]
})
export class MemberClientModule {}
