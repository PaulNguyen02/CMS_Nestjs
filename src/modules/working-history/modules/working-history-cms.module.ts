import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingHistoryService } from '../working-history.service';
import { WorkingHistory } from '../entities/working-history.entity';
import { WorkingHistoryCMSController } from './../controllers/working-history-cms.controller';
@Module({
  imports: [TypeOrmModule.forFeature([WorkingHistory])],
  controllers: [WorkingHistoryCMSController],
  providers: [WorkingHistoryService]
})
export class WorkingHistoryCMSModule {}
