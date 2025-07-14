import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/members.entity';
import { MembersService } from './members.service';
import { MembersV1Controller } from './v1/members.controller';
import { MembersV2Controller } from './v2/members.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Member])],
  controllers: [MembersV1Controller, MembersV2Controller],
  providers: [MembersService]
})
export class MemberModule {}
