import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { contactInformation } from '../entities/contact-information.entity';
import { ContactInformationClientController } from '../controllers/contact-client.controller';
import { ContactInformationService } from '../contact-information.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([contactInformation]),
    ThrottlerModule.forRoot({
        throttlers: [
          {
            ttl: 60000,
            limit: 15,
          },
        ],
      }),
  ],
  controllers: [
    ContactInformationClientController
  ],
  providers: [ContactInformationService]
})
export class ContactClientModule {}