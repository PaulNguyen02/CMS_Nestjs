import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contactInformation } from './entities/contact-information.entity';
import { ContactInformationV1Controller } from './v1/contact-information.controller';
import { ContactInformationV2Controller } from './v2/contact-information.controller';
import { ContactInformationService } from './contact-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([contactInformation])],
  controllers: [
    ContactInformationV1Controller,
    ContactInformationV2Controller
  ],
  providers: [ContactInformationService]
})
export class ContactInformationModule {}
