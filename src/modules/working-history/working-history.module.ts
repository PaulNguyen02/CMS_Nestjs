import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { WorkingHistoryCMSModule } from './modules/working-history-cms.module';
@Module({
  imports: [
    WorkingHistoryCMSModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: WorkingHistoryCMSModule
      },
    ])
  ],
})
export class WorkingHistoryModule {}
