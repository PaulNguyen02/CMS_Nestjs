import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { PostsV1Controller } from './v1/posts.controller';
import { PostsV2Controller } from './v2/posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsV1Controller, PostsV2Controller],
  providers: [PostsService]
})
export class PostsModule {}
