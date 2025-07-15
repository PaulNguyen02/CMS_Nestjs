import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuGroup } from '../entities/menu-group.entity';
import { MenuGroupsService } from '../menu-group.service';
import { MenuGroupsCMSController } from '../controllers/menu-group-cms.controller';

@Module({
  imports:[TypeOrmModule.forFeature([menuGroup])],
  controllers: [MenuGroupsCMSController],
  providers: [MenuGroupsService]
})
export class MenuGroupCMSModule {}
