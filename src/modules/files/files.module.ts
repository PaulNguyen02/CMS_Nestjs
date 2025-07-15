import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FilesCMSModule } from './modules/files-cms.module';
@Module({
  imports: [
    FilesCMSModule,
    RouterModule.register([
      {
        path: 'v1/admin',
        module: FilesCMSModule,
      },
    ])
  ],
})
export class FilesModule {}
