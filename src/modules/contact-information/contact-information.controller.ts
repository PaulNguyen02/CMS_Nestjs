import { Controller,
    Post, 
    Get,
    Put,
    Param,
    Body 
} from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { GetInformationDto } from './dto/get-information.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { ContactInformationService } from './contact-information.service';
@Controller('contact-information')
export class ContactInformationController {
    constructor(private readonly contactinformationService: ContactInformationService) {}
    @Post()
    async create(@Body() dto: CreateInformationDto): Promise<ApiResponse<GetInformationDto>>{
        try{
            const result = await this.contactinformationService.create(dto);
            return ApiResponse.success<GetInformationDto>(result);
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async get(): Promise<ApiResponse<GetInformationDto[]>>{
        try{
            const res = await this.contactinformationService.get();
            return ApiResponse.success<GetInformationDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() update: UpdateInformationDto): Promise<ApiResponse<GetInformationDto>>{
        try{
            const res = await this.contactinformationService.update(id, update);
            return ApiResponse.success<GetInformationDto>(res)
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }
}
