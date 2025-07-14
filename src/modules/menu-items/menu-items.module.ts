import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuItem } from './entities/menu-item.entity';
import { MenuItemsV1Controller } from './v1/menu-items.controller';
import { MenuItemsV2Controller } from './v2/menu-items.controller';
import { MenuItemsService } from './menu-items.service';

@Module({
  imports:[TypeOrmModule.forFeature([menuItem])],
  controllers: [MenuItemsV1Controller, MenuItemsV2Controller],
  providers: [MenuItemsService]
})
export class MenuItemModule {}
