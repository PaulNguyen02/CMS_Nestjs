import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { GetInformationDto } from './dto/get-information.dto';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { ContactInformationService } from './contact-information.service';
import { ContactInformationParam } from './dto/contact-information-param.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('contact-information')
export class ContactInformationController {
    constructor(private readonly contactInformationService: ContactInformationService) {}
    @Post()
    async createInformation(
        @Body() dto: CreateInformationDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetInformationDto>>{
        const result = await this.contactInformationService.createInformation(dto, username);
        return ApiResponse.success<GetInformationDto>(result);
    }

    @Get()
    async getInformation(@Query() query: ContactInformationParam): Promise<ApiResponse<GetInformationDto[]>>{
        const res = await this.contactInformationService.getInformation(query);
        return ApiResponse.success<GetInformationDto[]>(res)
    }
    
    @Put(':id')
    async updateInformation(
        @Param('id') id: string, 
        @Body() update: UpdateInformationDto,
        @GetUser('username') username: string,
    ): Promise<ApiResponse<GetInformationDto>>{
        const res = await this.contactInformationService.updateInformation(id, update, username);
        return ApiResponse.success<GetInformationDto>(res)
    }

    @Delete()
    async deleteInformation(@Param('id') id: string){
        const res = await this.contactInformationService.deleteInformation(id)
        return ApiResponse.success<GetInformationDto>(res)
    }
}
