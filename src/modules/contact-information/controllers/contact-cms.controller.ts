import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query
} from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { GetInformationDto } from '../dto/response/get-information.dto';
import { CreateInformationDto } from '../dto/request/create-information.dto';
import { UpdateInformationDto } from '../dto/request/update-information.dto';
import { ContactInformationService } from '../contact-information.service';
import { ContactInformationParam } from '../dto/request/contact-information-param.dto';

@Controller('contact-information')
export class ContactInformationCMSController {
    constructor(private readonly contactInformationService: ContactInformationService) {}

    @Get()
    async getInformation(@Query() query: ContactInformationParam): Promise<ApiResponse<GetInformationDto[]>>{
        const res = await this.contactInformationService.getInformation(query);
        return ApiResponse.success<GetInformationDto[]>(res)
    }

    @Post()
    async createInformation(
        @Body() dto: CreateInformationDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetInformationDto>>{
        const result = await this.contactInformationService.createInformation(dto, username);
        return ApiResponse.success<GetInformationDto>(result);
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

    @Delete(':id')
    async deleteInformation(@Param('id') id: string){
        const res = await this.contactInformationService.deleteInformation(id)
        return ApiResponse.success<GetInformationDto>(res)
    }
}
