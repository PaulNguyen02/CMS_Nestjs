import { GetUserLoginDto } from "./dto/get-userlogin.dto"
import { CreateUserLoginDto } from "./dto/create-userlogin.dto"
export interface IUserLoginService{
    getLoginProfile(username: string): Promise<GetUserLoginDto| null>
    create(dto: CreateUserLoginDto, userAgent: string): Promise<GetUserLoginDto>
    get(): Promise<GetUserLoginDto[]>
    updateLoginMeta(userId: string, userAgent: string): Promise<void>
}