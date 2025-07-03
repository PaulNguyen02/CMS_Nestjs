import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Param,
    Body 
 } from '@nestjs/common';
import { MenuGroupsService } from './menu-group.service';
import { GetMenuGroupDto } from './dto/get-menugroup.dto';
import { CreateMenuGroupDto } from './dto/create-menugroup.dto';
import { UpdateMenuGroupDto } from './dto/update-menugroup.dto';
import { ApiResponse } from '@/common/response/api-response';
@Controller('menu-groups')
export class MenuGroupsController {
    constructor(private readonly menugroupService: MenuGroupsService) {}
    @Post('create')
    async create(@Body() dto: CreateMenuGroupDto): Promise<ApiResponse<GetMenuGroupDto>>{
        try{
            const result = await this.menugroupService.create(dto);
            return ApiResponse.success<GetMenuGroupDto>(result);
        }catch(err){
            return ApiResponse.error();
        }
    }

    @Get()
    async get(): Promise<ApiResponse<GetMenuGroupDto[]>>{
        try{
            const res = await this.menugroupService.get();
            return ApiResponse.success<GetMenuGroupDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() update: UpdateMenuGroupDto): Promise<ApiResponse<GetMenuGroupDto>>{
        try{
            const res = await this.menugroupService.update(id, update);
            return ApiResponse.success<GetMenuGroupDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetMenuGroupDto>>{
        try{
            const res = await this.menugroupService.delete(id);
            return ApiResponse.success<GetMenuGroupDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
