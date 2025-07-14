import { Controller,
    Get,
    Query,
    UseGuards 
} from '@nestjs/common';
import { PartnersService } from '../partners.service';
import { GetPartnerDto } from '../dto/get-partner.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
import { PartnerParam } from '../dto/partner-param.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller({path: 'partners', version:'2'})
export class PartnersV2Controller {
    constructor(private readonly partnerService: PartnersService) {}

    @Public()
    @Get()
    async getPaginatePartner(@Query() query: PartnerParam) : Promise<ApiResponse<PaginationDto<GetPartnerDto>>>{
        const res = await this.partnerService.getPaginatePartner(query);
        return ApiResponse.success<PaginationDto<GetPartnerDto>>(res)
    }

}
