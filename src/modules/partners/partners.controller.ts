import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body 
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { GetPartnerDto } from './dto/get-partner.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PartnerParam } from './dto/partner-param.dto';
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnerService: PartnersService) {}
    @Post()
    async createPartner(@Body() dto: CreatePartnerDto): Promise<ApiResponse<GetPartnerDto>>{
        try{
            const result = await this.partnerService.createPartner(dto);
            return ApiResponse.success<GetPartnerDto>(result);
        }catch{
            return ApiResponse.error();
        }
    }

    @Get('all')
    async getAllPartner(): Promise<ApiResponse<GetPartnerDto[]>>{
        try{
            const res = await this.partnerService.getPartner();
            return ApiResponse.success<GetPartnerDto[]>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Get()
    async getPaginatePartner(@Query() query: PartnerParam) : Promise<ApiResponse<PaginationDto<GetPartnerDto>>>{
        try{
            const res = await this.partnerService.getPaginatePartner(query);
            return ApiResponse.success<PaginationDto<GetPartnerDto>>(res)
        }catch{
            return ApiResponse.error()
        }
    }

    @Put(':id')
    async updatePartner(
        @Param('id') id: string, 
        @Body() update: UpdatePartnerDto 
    ): Promise<ApiResponse<GetPartnerDto>>{
        try{
            const res = await this.partnerService.updatePartner(id, update);
            return ApiResponse.success<GetPartnerDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }


    @Delete(':id')
    async deletePartner(@Param('id') id: string): Promise<ApiResponse<GetPartnerDto>>{
        try{
            const res = await this.partnerService.deletePartner(id);
            return ApiResponse.success<GetPartnerDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
