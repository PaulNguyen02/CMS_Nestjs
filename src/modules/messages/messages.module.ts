import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MessageCMSModule } from './modules/messages-cms.module';
import { MessageClientModule } from './modules/messages-client.module';
@Module({
  imports: [
    MessageCMSModule,
    MessageClientModule,
    RouterModule.register([
      {
        path: 'v1/cms',
        module: MessageCMSModule,
      },
      {
        path: 'v1/client',
        module: MessageClientModule,
      }
    ])
  ],
})
export class MessageModule {}
