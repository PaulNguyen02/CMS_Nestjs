import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from './entities/messages.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessageModule {}
