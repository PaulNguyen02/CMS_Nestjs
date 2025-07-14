import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { MessagesService } from './messages.service';
import { MessagesV1Controller } from './v1/messages.controller';
import { MessagesV2Controller } from './v2/messages.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesV1Controller, MessagesV2Controller]
})
export class MessageModule {}
