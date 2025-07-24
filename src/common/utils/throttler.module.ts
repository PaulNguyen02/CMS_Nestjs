import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 555,
        },
      ],
    }),
  ]
})
export class ThrottleModule{}