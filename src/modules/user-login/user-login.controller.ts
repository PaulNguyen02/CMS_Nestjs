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
    async create(
        @Body() dto: CreateUserLoginDto, 
        @Headers('user-agent') userAgent: string
    ): Promise<ApiResponse<GetUserLoginDto>>{
        try{
            const result = await this.userLoginService.create(dto, userAgent);
            return ApiResponse.success<GetUserLoginDto>(result);
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async get(): Promise<ApiResponse<GetUserLoginDto[]>> {
        try{
            const result = await this.userLoginService.get();
            return ApiResponse.success<GetUserLoginDto[]>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }
}
