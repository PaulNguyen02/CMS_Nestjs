import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Posts } from '../entities/posts.entity';
import { PostsClientController } from '../controllers/posts-client.controller';
import { PostsService } from '../posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 15,
        },
      ],
    }),
  ],
  controllers: [PostsClientController],
  providers: [PostsService]
})
export class PostsClientModule {}