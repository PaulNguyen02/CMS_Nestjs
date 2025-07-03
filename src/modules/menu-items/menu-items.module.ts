import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuItem } from './entities/menu-item.entity';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';

@Module({
  imports:[TypeOrmModule.forFeature([menuItem])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService]
})
export class MenuItemModule {}
