import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contactInformation } from '../entities/contact-information.entity';
import { ContactInformationClientController } from '../controllers/contact-client.controller';
import { ContactInformationService } from '../contact-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([contactInformation])],
  controllers: [
    ContactInformationClientController
  ],
  providers: [ContactInformationService]
})
export class ContactClientModule {}