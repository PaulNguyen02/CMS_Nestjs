import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/members.entity';
import { MembersService } from '../members.service';
import { MembersClientController } from '../controllers/members-client.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Member])],
  controllers: [MembersClientController],
  providers: [MembersService]
})
export class MemberClientModule {}
