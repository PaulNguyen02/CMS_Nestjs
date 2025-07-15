import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MenuItemCMSModule } from './modules/menu-items-cms.module';
import { MenuItemClientModule } from './modules/menu-items-client.module';

@Module({
  imports: [
    MenuItemCMSModule,
    MenuItemClientModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: MenuItemCMSModule,
      },
      {
        path: 'v1/user',
        module: MenuItemClientModule,
      },
    ])
  ],
})
export class MenuItemModule {}
