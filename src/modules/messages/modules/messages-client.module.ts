import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Messages } from '../entities/messages.entity';
import { MessagesService } from '../messages.service';
import { MessagesClientController } from '../controllers/messages-client.controller';
@Module({
  imports:[
    TypeOrmModule.forFeature([Messages]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 15,
        },
      ],
    }),
  ],
  providers: [MessagesService],
  controllers: [MessagesClientController]
})
export class MessageClientModule {}
