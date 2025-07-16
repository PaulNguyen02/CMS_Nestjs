import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PartnersCMSModule } from './modules/partners-cms.module';
import { PartnersClientModule } from './modules/partners-client.module';
@Module({
  imports: [
    PartnersCMSModule,
    PartnersClientModule,
    RouterModule.register([
      {
        path: 'v1/cms',
        module: PartnersCMSModule,
      },
      {
        path: 'v1/client',
        module: PartnersClientModule,
      }
    ])
  ],
})
export class PartnersModule {}
