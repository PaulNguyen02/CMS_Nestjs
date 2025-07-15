import { 
    Controller,
    Get,
    Query
} from '@nestjs/common';
import { ApiResponse } from '@/common/response/api-response';
import { GetInformationDto } from '../dto/get-information.dto';
import { ContactInformationService } from '../contact-information.service';
import { ContactInformationParam } from '../dto/contact-information-param.dto';
import { Public } from '@/common/decorators/public.decorator';

@Controller('contact-information')
export class ContactInformationClientController {
    constructor(private readonly contactInformationService: ContactInformationService) {}

    @Get()
    @Public()
    async showToClient(@Query() query: ContactInformationParam): Promise<ApiResponse<GetInformationDto[]>>{
        const res = await this.contactInformationService.getInformation(query);
        return ApiResponse.success<GetInformationDto[]>(res)
    }
    
}
