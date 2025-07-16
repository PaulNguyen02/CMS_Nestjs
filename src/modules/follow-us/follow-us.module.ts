import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FollowUsCMSModule } from './modules/follow-us-cms.module';
import { FollowUsClientModule } from './modules/follow-us-client.module';

@Module({
  imports: [
    FollowUsCMSModule,
    FollowUsClientModule,
    RouterModule.register([
      {
        path: 'v1/cms',
        module: FollowUsCMSModule,
      },
      {
        path: 'v1/client',
        module: FollowUsClientModule,
      }
    ])
  ],
})
export class FollowUsModule {}
