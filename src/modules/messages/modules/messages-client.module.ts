import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from '../entities/messages.entity';
import { MessagesService } from '../messages.service';
import { MessagesClientController } from '../controllers/messages-client.controller';
@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  controllers: [MessagesClientController]
})
export class MessageClientModule {}
