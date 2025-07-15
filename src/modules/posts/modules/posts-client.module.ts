import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { PostsClientController } from '../controllers/posts-client.controller';
import { PostsService } from '../posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsClientController],
  providers: [PostsService]
})
export class PostsClientModule {}