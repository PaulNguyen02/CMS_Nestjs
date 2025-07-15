import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { Partners } from '../entities/partners.entity';
import { PartnersService } from '../partners.service';
import { PartnersClientController } from '../controllers/partners-client.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Partners]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 15,
        },
      ],
    }),
],
  controllers: [PartnersClientController],
  providers: [PartnersService]
})
export class PartnersClientModule {}
