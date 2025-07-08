import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Param,
    Body 
} from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { GetInformationDto } from './dto/get-information.dto';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { ContactInformationService } from './contact-information.service';
@Controller('contact-information')
export class ContactInformationController {
    constructor(private readonly contactInformationService: ContactInformationService) {}
    @Post()
    async createInformation(@Body() dto: CreateInformationDto): Promise<ApiResponse<GetInformationDto>>{
        try{
            const result = await this.contactInformationService.createInformation(dto);
            return ApiResponse.success<GetInformationDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getInformation(): Promise<ApiResponse<GetInformationDto[]>>{
        try{
            const res = await this.contactInformationService.getInformation();
            return ApiResponse.success<GetInformationDto[]>(res)
        }catch{
            return ApiResponse.error()
        }
    }
    
    @Put(':id')
    async updateInformation(@Param('id') id: string, @Body() update: UpdateInformationDto): Promise<ApiResponse<GetInformationDto>>{
        try{
            const res = await this.contactInformationService.updateInformation(id, update);
            return ApiResponse.success<GetInformationDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Delete()
    async deleteInformation(@Param('id') id: string){
        try{
            const res = await this.contactInformationService.deleteInformation(id)
            return ApiResponse.success<GetInformationDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
