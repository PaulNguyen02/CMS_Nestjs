import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuItem } from '../entities/menu-item.entity';
import { MenuItemsCMSController } from '../controllers/menu-items-cms.controller';
import { MenuItemsService } from '../menu-items.service';

@Module({
  imports:[TypeOrmModule.forFeature([menuItem])],
  controllers: [MenuItemsCMSController],
  providers: [MenuItemsService]
})
export class MenuItemCMSModule {}