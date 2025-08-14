import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query
 } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MenuGroupsService } from '../menu-group.service';
import { GetMenuGroupDto } from '../dto/response/get-menugroup.dto';
import { CreateMenuGroupDto } from '../dto/request/create-menugroup.dto';
import { UpdateMenuGroupDto } from '../dto/request/update-menugroup.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MenuGroupParam } from '../dto/request/menu-group-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';

@ApiBearerAuth('access-token')
@Controller('menu-groups')
export class MenuGroupsCMSController {
    constructor(private readonly menugroupService: MenuGroupsService) {}

    @Get()
    async getMenuGroup(@Query() query: MenuGroupParam): Promise<ApiResponse<GetMenuGroupDto[]>>{
        const res = await this.menugroupService.getMenuGroup(query);
        return ApiResponse.success<GetMenuGroupDto[]>(res)
    }

    @Get('search')
    async searchMenuGroup(@Query('query') search: string): Promise<ApiResponse<GetMenuGroupDto[]>>
    {
        const res = await this.menugroupService.searchMenuGroup(search);
        return ApiResponse.success<GetMenuGroupDto[]>(res);
    }

    @Post()
    async createMenuGroup(
        @Body() dto: CreateMenuGroupDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMenuGroupDto>>{
        const result = await this.menugroupService.createMenuGroup(dto, username);
        return ApiResponse.success<GetMenuGroupDto>(result);
    }
    
    @Put(':id')
    async updateMenuGroup(
        @Param('id') id: string, 
        @Body() update: UpdateMenuGroupDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMenuGroupDto>>{
        const res = await this.menugroupService.updateMenuGroup(id, update, username);
        return ApiResponse.success<GetMenuGroupDto>(res)
    }
    
    @Delete(':id')
    async deleteMenuGroup(@Param('id') id: string): Promise<ApiResponse<GetMenuGroupDto>>{
        const res = await this.menugroupService.deleteMenuGroup(id);
        return ApiResponse.success<GetMenuGroupDto>(res)
    }
}
