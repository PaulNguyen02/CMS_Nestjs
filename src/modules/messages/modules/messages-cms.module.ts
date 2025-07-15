import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity';
import { MessagesService } from '../messages.service';
import { MessagesCMSController } from '../controllers/messages-cms.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesCMSController]
})
export class MessageCMSModule {}
