import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PostsCMSModule } from './modules/posts-cms.module';
import { PostsClientModule } from './modules/posts-client.module';

@Module({
  imports: [
    PostsCMSModule,
    PostsClientModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: PostsCMSModule,
      },
      {
        path: 'v1/user',
        module: PostsClientModule,
      },
    ])
  ],
})
export class PostsModule {}
