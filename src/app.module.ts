import { Module } from '@nestjs/common';
import { appModules } from '@/common/const/app_module.const';

@Module({
  imports: appModules,
  controllers: [],
  providers: [],
})
export class AppModule {}
