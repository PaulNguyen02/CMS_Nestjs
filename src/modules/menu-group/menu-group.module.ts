import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MenuGroupCMSModule } from './modules/menu-group-cms.module';

@Module({
  imports: [
    MenuGroupCMSModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: MenuGroupCMSModule,
      },
    ])
  ],
})
export class MenuGroupModule {}
