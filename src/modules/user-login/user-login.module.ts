import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginService } from './user-login.service';
import { userLogin } from './entities/user-login.entity';
import { LoginController } from './user-login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([userLogin])],
  controllers: [LoginController],
  providers: [UserLoginService],
  exports: [UserLoginService], 
})
export class UserLoginModule {}
