import { 
    Controller,
    Get,
    Query,
    Version,
    UseGuards 
} from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { GetInformationDto } from '../dto/get-information.dto';
import { ContactInformationService } from '../contact-information.service';
import { ContactInformationParam } from '../dto/contact-information-param.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
@UseGuards(JwtAuthGuard)
@Controller({
    path: 'contact-information',
    version: '2'
})
export class ContactInformationV2Controller {
    constructor(private readonly contactInformationService: ContactInformationService) {}

    @Get()
    @Public()
    async showToClient(@Query() query: ContactInformationParam): Promise<ApiResponse<GetInformationDto[]>>{
        const res = await this.contactInformationService.getInformation(query);
        return ApiResponse.success<GetInformationDto[]>(res)
    }
    
}
