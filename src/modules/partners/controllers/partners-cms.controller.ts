import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body
} from '@nestjs/common';
import { PartnersService } from '../partners.service';
import { GetPartnerDto } from '../dto/get-partner.dto';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PartnerParam } from '../dto/partner-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('partners')
export class PartnersCMSController {
    constructor(private readonly partnerService: PartnersService) {}
    @Post()
    async createPartner(
        @Body() dto: CreatePartnerDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetPartnerDto>>{
        const result = await this.partnerService.createPartner(dto, username);
        return ApiResponse.success<GetPartnerDto>(result);
    }

    @Get()
    async getPaginatePartner(@Query() query: PartnerParam) : Promise<ApiResponse<PaginationDto<GetPartnerDto>>>{
        const res = await this.partnerService.getPaginatePartner(query);
        return ApiResponse.success<PaginationDto<GetPartnerDto>>(res)
    }

    @Put(':id')
    async updatePartner(
        @Param('id') id: string, 
        @Body() update: UpdatePartnerDto,
        @GetUser('username') username: string 
    ): Promise<ApiResponse<GetPartnerDto>>{
        const res = await this.partnerService.updatePartner(id, update, username);
        return ApiResponse.success<GetPartnerDto>(res)
    }

    @Delete(':id')
    async deletePartner(@Param('id') id: string): Promise<ApiResponse<GetPartnerDto>>{
        const res = await this.partnerService.deletePartner(id);
        return ApiResponse.success<GetPartnerDto>(res)
    }
}
