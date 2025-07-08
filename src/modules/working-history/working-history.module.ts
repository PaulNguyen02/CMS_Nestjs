import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHistoryService } from './working-history.service';
import { WorkingHistory } from './entities/working-history.entity';
import { WorkingHistoryController } from './working-history.controller';
@Module({
  imports: [TypeOrmModule.forFeature([WorkingHistory])],
  controllers: [WorkingHistoryController],
  providers: [WorkingHistoryService]
})
export class WorkingHistoryModule {}
