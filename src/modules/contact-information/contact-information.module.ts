import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { contactInformation } from './entities/contact-information.entity';
import { ContactInformationController } from './contact-information.controller';
import { ContactInformationService } from './contact-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([contactInformation])],
  controllers: [ContactInformationController],
  providers: [ContactInformationService]
})
export class ContactInformationModule {}
