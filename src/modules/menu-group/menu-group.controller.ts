import { Controller,
    Post, 
    Get,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards 
 } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenuGroupsService } from './menu-group.service';
import { GetMenuGroupDto } from './dto/get-menugroup.dto';
import { CreateMenuGroupDto } from './dto/create-menugroup.dto';
import { UpdateMenuGroupDto } from './dto/update-menugroup.dto';
import { ApiResponse } from '@/common/response/api-response';
import { MenuGroupParam } from './dto/menu-group-param.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('menu-groups')
export class MenuGroupsController {
    constructor(private readonly menugroupService: MenuGroupsService) {}
    @Post()
    async createMenuGroup(
        @Body() dto: CreateMenuGroupDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMenuGroupDto>>{
        const result = await this.menugroupService.createMenuGroup(dto, username);
        return ApiResponse.success<GetMenuGroupDto>(result);
    }

    @Get()
    async getMenuGroup(@Query() query: MenuGroupParam): Promise<ApiResponse<GetMenuGroupDto[]>>{
        const res = await this.menugroupService.getMenuGroup(query);
        return ApiResponse.success<GetMenuGroupDto[]>(res)
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
