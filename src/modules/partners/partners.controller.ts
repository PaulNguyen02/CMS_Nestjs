import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    ParseIntPipe,
    DefaultValuePipe  
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { GetPartnerDto } from './dto/get-partner.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiResponse } from '@/common/response/api-response';
@Controller('partners')
export class PartnersController {
    constructor(private readonly partnerService: PartnersService) {}
    @Post()
    async create(@Body() dto: CreatePartnerDto): Promise<ApiResponse<GetPartnerDto>>{
        try{
            const result = await this.partnerService.create(dto);
            return ApiResponse.success<GetPartnerDto>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }

    @Get('all')
    async get(): Promise<ApiResponse<GetPartnerDto[]>>{
        try{
            const res = await this.partnerService.get();
            return ApiResponse.success<GetPartnerDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }

    @Get()
    async paginate(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) : Promise<ApiResponse<PaginationDto<GetPartnerDto>>>{
        try{
            const res = await this.partnerService.paginate(page,limit);
            return ApiResponse.success<PaginationDto<GetPartnerDto>>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }


    @Put(':id')
    async update(
        @Param('id') id: string, 
        @Body() update: UpdatePartnerDto 
    ): Promise<ApiResponse<GetPartnerDto>>{
        try{
            const res = await this.partnerService.update(id, update);
            return ApiResponse.success<GetPartnerDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetPartnerDto>>{
        try{
            const res = await this.partnerService.delete(id);
            return ApiResponse.success<GetPartnerDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
