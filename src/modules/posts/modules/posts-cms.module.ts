import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { PostsCMSController } from '../controllers/posts-cms.controller';
import { PostsService } from '../posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostsCMSController],
  providers: [PostsService]
})
export class PostsCMSModule {}