import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menuGroup } from './entities/menu-group.entity';
import { MenuGroupsController } from './menu-group.controller';
import { MenuGroupsService } from './menu-group.service';

@Module({
  imports:[TypeOrmModule.forFeature([menuGroup])],
  controllers: [MenuGroupsController],
  providers: [MenuGroupsService]
})
export class MenuGroupModule {}
