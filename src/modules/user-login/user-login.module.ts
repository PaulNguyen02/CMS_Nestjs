import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/guard/jwt.strategy';
import { UserLoginService } from './user-login.service';
import { userLogin } from './entities/user-login.entity';
import { LoginController } from './user-login.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    TypeOrmModule.forFeature([userLogin])
  ],
  controllers: [LoginController],
  providers: [UserLoginService, JwtStrategy],
  exports: [UserLoginService], 
})
export class UserLoginModule {}
