import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { userLogin } from './entities/user-login.entity';
import { GetUserLoginDto } from './dto/get-userlogin.dto';
import { CreateUserLoginDto } from './dto/create-userlogin.dto';
@Injectable()
export class UserLoginService{
    constructor(
        @InjectRepository(userLogin)
        private readonly userRepository: Repository<userLogin>,
    ) {}

    async findByUsername(username: string): Promise<userLogin | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async getLoginProfile(username: string): Promise<GetUserLoginDto| null> {
        const login_profile =  this.userRepository.findOne({ where: { username } });
        const res = plainToInstance(GetUserLoginDto, login_profile, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async create(dto: CreateUserLoginDto, userAgent: string): Promise<GetUserLoginDto> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        const login = this.userRepository.create({
            username: dto.username,
            password: hashedPassword,
            user_agent: userAgent,
            login_at: new Date() 
        });
        const saved = await this.userRepository.save(login);
        const res = plainToInstance(GetUserLoginDto, saved, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async get(): Promise<GetUserLoginDto[]>{
        const res = await this.userRepository.find();
        return plainToInstance(GetUserLoginDto, res, {
            excludeExtraneousValues: true,
        });
    }

    async updateLoginMeta(userId: string, userAgent: string): Promise<void> {
        await this.userRepository.update(userId, {
            user_agent: userAgent,
            login_at: new Date(),
        });
    }
}
