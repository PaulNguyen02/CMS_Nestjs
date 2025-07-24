import { 
    Controller, 
    Post, 
    Get,
    Body, 
    Headers 
} from '@nestjs/common';
import { UserLoginService } from '../user-login.service';
import { GetUserLoginDto } from '../dto/response/get-userlogin.dto';
import { ApiResponse } from '@/common/response/api-response';
import { CreateUserLoginDto } from '../dto/request/create-userlogin.dto';
import { Public } from '@/common/decorators/public.decorator';
@Controller('auth')
export class AuthController {
    constructor(private readonly userLoginService: UserLoginService) {}
    
    @Get()
    async getLoginHistory(): Promise<ApiResponse<GetUserLoginDto[]>> {
        const result = await this.userLoginService.getLoginHistory();
        return ApiResponse.success<GetUserLoginDto[]>(result);
    }

    @Post('register')
    @Public()
    async register(
        @Body() dto: CreateUserLoginDto, 
        @Headers('user-agent') userAgent: string
    ): Promise<ApiResponse<string>>{
        const result = await this.userLoginService.register(dto);
        return ApiResponse.success<string>(result);
    }

    @Post('login')
    @Public()
    async login(
        @Body() dto: CreateUserLoginDto, 
        @Headers('user-agent') userAgent: string
    ): Promise<ApiResponse<string>>{
        const result = await this.userLoginService.login(dto, userAgent);
        return ApiResponse.success<string>(result);
    }

}
