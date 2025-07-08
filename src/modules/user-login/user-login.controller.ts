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
    ): Promise<ApiResponse<GetUserLoginDto>>{
        try{
            const result = await this.userLoginService.createNewProfile(dto, userAgent);
            return ApiResponse.success<GetUserLoginDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getUsers(): Promise<ApiResponse<GetUserLoginDto[]>> {
        try{
            const result = await this.userLoginService.getUsers();
            return ApiResponse.success<GetUserLoginDto[]>(result);
        }catch{
            return ApiResponse.error();
        }
    }
}
