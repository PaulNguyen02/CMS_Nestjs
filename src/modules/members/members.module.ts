import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MemberCMSModule } from './modules/members-cms.module';
import { MemberClientModule } from './modules/members-client.module';
@Module({
  imports: [
    MemberCMSModule,
    MemberClientModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: MemberCMSModule,
      },
      {
        path: 'v1/user',
        module: MemberClientModule,
      },
    ])
  ],
})
export class MemberModule {}
