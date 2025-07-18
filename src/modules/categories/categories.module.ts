import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CategoriesCMSModule } from './modules/categories-cms.module';

@Module({
  imports: [
    CategoriesCMSModule,
    RouterModule.register([
      {
        path: 'v1/cms',
        module: CategoriesCMSModule,
      },
    ])
  ],
})
export class CategoriesModule {}
