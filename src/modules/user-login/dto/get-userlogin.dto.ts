import { Expose } from "class-transformer";
export class GetUserLoginDto {
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'username' })
    username: string;

    @Expose({ name: 'user_agent' })
    user_agent: string;
    
    @Expose({ name: 'login_at' })
    login_at: Date;
}