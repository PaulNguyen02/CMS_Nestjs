import { Expose } from "class-transformer";
export class GetUserLoginDto {
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'username' })
    username: string;

    @Expose({ name: 'user_agent' })
    userAgent: string;
    
    @Expose({ name: 'login_at' })
    loginAt: Date;
}