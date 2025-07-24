import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { AuthException } from './enums/auth-exceptions';
import { userLogin } from './entities/user-login.entity';
import { GetUserLoginDto } from './dto/response/get-userlogin.dto';
import { CreateUserLoginDto } from './dto/request/create-userlogin.dto';
@Injectable()
export class UserLoginService{
    constructor(
        @InjectRepository(userLogin)
        private readonly userRepository: Repository<userLogin>,
        private readonly jwtService: JwtService
    ) {}

    async getLoginHistory(): Promise<GetUserLoginDto[]>{
        const res = await this.userRepository.find();
        return plainToInstance(GetUserLoginDto, res, {
            excludeExtraneousValues: true,
        });
    }

    async register(dto: CreateUserLoginDto): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        const newUser = this.userRepository.create({
            username: dto.username,
            password: hashedPassword,
            createAt: new Date(),
        });

        const savedUser = await this.userRepository.save(newUser);
        return savedUser.username;
    }

    async login(dto: CreateUserLoginDto, userAgent: string): Promise<string> {
        const { username, password} = dto;

        let user = await this.userRepository.findOne({
            where: { username },
        });

        if(!user){
            throw new UnauthorizedException(AuthException.USER_NOT_FOUND);
        }else{
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException(AuthException.INVALID_CREDENTIALS);
            }
            await this.userRepository.update(user.id, {
                userAgent,
                loginAt: new Date(),
            });
        }
        const payload = { sub: user.id, username: user.username };
        const token = this.jwtService.sign(payload);
        return token
    }
}
