import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuItem } from '../entities/menu-item.entity';
import { MenuItemsClientController } from '../controllers/menu-items-client.controller';
import { MenuItemsService } from '../menu-items.service';

@Module({
  imports:[TypeOrmModule.forFeature([menuItem])],
  controllers: [MenuItemsClientController],
  providers: [MenuItemsService]
})
export class MenuItemClientModule {}