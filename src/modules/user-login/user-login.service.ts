import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { userLogin } from './entities/user-login.entity';
import { GetUserLoginDto } from './dto/get-userlogin.dto';
import { CreateUserLoginDto } from './dto/create-userlogin.dto';
@Injectable()
export class UserLoginService{
    constructor(
        @InjectRepository(userLogin)
        private readonly userRepository: Repository<userLogin>,
        private readonly jwtService: JwtService
    ) {}

    async findByUsername(username: string): Promise<userLogin | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async getLoginProfile(username: string): Promise<GetUserLoginDto| null> {
        const loginProfile =  this.userRepository.findOne({ where: { username } });
        const res = plainToInstance(GetUserLoginDto, loginProfile, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async Login(dto: CreateUserLoginDto, userAgent: string): Promise<string> {
        const { username, password} = dto;

        let user = await this.userRepository.findOne({
            where: { username },
        });

        if(!user){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(dto.password, salt);
    
            const login = this.userRepository.create({
                username: dto.username,
                password: hashedPassword,
                userAgent: userAgent,
                loginAt: new Date() 
            });
            user = await this.userRepository.save(login);
        }else{
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
            throw new UnauthorizedException('Sai mật khẩu');
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

    async getLoginHistory(): Promise<GetUserLoginDto[]>{
        const res = await this.userRepository.find();
        return plainToInstance(GetUserLoginDto, res, {
            excludeExtraneousValues: true,
        });
    }

    async updateLoginMeta(userId: string, userAgent: string): Promise<void> {
        await this.userRepository.update(userId, {
            userAgent: userAgent,
            loginAt: new Date(),
        });
    }
}
