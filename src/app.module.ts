import { Module } from '@nestjs/common';
import { appModules } from '@/common/const/app-module.const';

@Module({
  imports: appModules,
  controllers: [],
  providers: [],
})
export class AppModule {}
