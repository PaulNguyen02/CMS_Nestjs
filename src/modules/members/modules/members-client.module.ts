import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Member } from '../entities/members.entity';
import { MembersService } from '../members.service';
import { MembersClientController } from '../controllers/members-client.controller';
@Module({
  imports:[
    TypeOrmModule.forFeature([Member]),
    ThrottlerModule.forRoot({
        throttlers: [
        {
          ttl: 60000,
          limit: 15,
        },
      ],
    }),    
  ],
  controllers: [MembersClientController],
  providers: [MembersService]
})
export class MemberClientModule {}
