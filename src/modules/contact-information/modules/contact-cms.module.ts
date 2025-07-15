import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contactInformation } from '../entities/contact-information.entity';
import { ContactInformationCMSController } from '../controllers/contact-cms.controller';
import { ContactInformationService } from '../contact-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([contactInformation])],
  controllers: [
    ContactInformationCMSController
  ],
  providers: [ContactInformationService]
})
export class ContactCMSModule {}
