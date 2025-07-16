import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserLoginCMSModule } from './modules/user-login-cms.module';

@Module({
  imports: [
    UserLoginCMSModule,
    RouterModule.register([
      {
        path: 'v1/cms',
        module: UserLoginCMSModule,
      }
    ])
  ],
})
export class UserLoginModule {}
