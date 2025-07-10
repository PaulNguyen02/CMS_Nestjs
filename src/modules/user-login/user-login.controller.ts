import { 
    Controller, 
    Post, 
    Get,
    Body, 
    Headers 
} from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { GetUserLoginDto } from './dto/get-userlogin.dto';
import { ApiResponse } from '@/common/response/api-response';
import { CreateUserLoginDto } from './dto/create-userlogin.dto';
@Controller('user-login')
export class LoginController {
    constructor(private readonly userLoginService: UserLoginService) {}

    @Post()
    async createNewUser(
        @Body() dto: CreateUserLoginDto, 
        @Headers('user-agent') userAgent: string
    ): Promise<ApiResponse<string>>{
        const result = await this.userLoginService.Login(dto, userAgent);
        return ApiResponse.success<string>(result);
    }

    @Get()
    async getLoginHistory(): Promise<ApiResponse<GetUserLoginDto[]>> {
        const result = await this.userLoginService.getLoginHistory();
        return ApiResponse.success<GetUserLoginDto[]>(result);
    }
}
