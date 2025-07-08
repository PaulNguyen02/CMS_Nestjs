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
    @Post()
    async createMenuGroup(@Body() dto: CreateMenuGroupDto): Promise<ApiResponse<GetMenuGroupDto>>{
        try{
            const result = await this.menugroupService.createMenuGroup(dto);
            return ApiResponse.success<GetMenuGroupDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getMenuGroup(): Promise<ApiResponse<GetMenuGroupDto[]>>{
        try{
            const res = await this.menugroupService.getMenuGroup();
            return ApiResponse.success<GetMenuGroupDto[]>(res)
        }catch{
            return ApiResponse.error()
        }
    }
    
    @Put(':id')
    async updateMenuGroup(@Param('id') id: string, @Body() update: UpdateMenuGroupDto): Promise<ApiResponse<GetMenuGroupDto>>{
        try{
            const res = await this.menugroupService.updateMenuGroup(id, update);
            return ApiResponse.success<GetMenuGroupDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }
    
    @Delete(':id')
    async deleteMenuGroup(@Param('id') id: string): Promise<ApiResponse<GetMenuGroupDto>>{
        try{
            const res = await this.menugroupService.deleteMenuGroup(id);
            return ApiResponse.success<GetMenuGroupDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
