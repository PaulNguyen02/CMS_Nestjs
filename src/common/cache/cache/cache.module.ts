import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
    imports: [
      CacheModule.register({
      ttl: 5, 
      max: 100, 
      isGlobal: true, 
    }),
  ],
})
export class Cache {}
