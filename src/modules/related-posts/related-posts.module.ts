import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { relatedPosts } from './entities/related-posts.entity';
import { RelatedPostsController } from './related-posts.controller';
import { RelatedPostsService } from './related-posts.service';
@Module({
  imports: [TypeOrmModule.forFeature([relatedPosts])],
  controllers: [RelatedPostsController],
  providers: [RelatedPostsService]
})
export class RelatedPostsModule {}
