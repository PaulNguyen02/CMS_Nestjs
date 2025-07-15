import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ContactClientModule } from './modules/contact-client.module';
import { ContactCMSModule } from './modules/contact-cms.module';

@Module({
  imports: [
    ContactCMSModule,
    ContactClientModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: ContactCMSModule,
      },
      {
        path: 'v1/user',
        module: ContactClientModule,
      }
    ])
  ],
})
export class ContactInformationModule {}
