import { 
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body,
    UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenuItemsService } from './menu-items.service';
import { GetMenuItemDto } from './dto/get-menuitem.dto';
import { CreateMenuItemDto } from './dto/create-menuitem.dto';
import { UpdateMenuItemDto } from './dto/update-menuitem.dto';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { MenuItemParam } from './dto/menu-item-param.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('menu-items')
export class MenuItemsController {
    constructor(private readonly menuitemService: MenuItemsService) {}

    @Post()
    async createMenuItem(
        @Body() dto: CreateMenuItemDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMenuItemDto>>{
        const result = await this.menuitemService.createMenuItem(dto, username);
        return ApiResponse.success<GetMenuItemDto>(result);
    }

    @Get()
    async getMenuItem(@Query() query: MenuItemParam): Promise<ApiResponse<GetMenuItemDto[]>>{
        const res = await this.menuitemService.getMenuItem(query);
        return ApiResponse.success<GetMenuItemDto[]>(res)
    }
    
    @Put(':id')
    async updateMenuItem(
        @Param('id') id: string, 
        @Body() update: UpdateMenuItemDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMenuItemDto>>{
        const res = await this.menuitemService.updateMenuItem(id, update, username);
        return ApiResponse.success<GetMenuItemDto>(res)
    }
    
    @Delete(':id')
    async deleteMenuItem(@Param('id') id: string): Promise<ApiResponse<GetMenuItemDto>>{
        const res = await this.menuitemService.deleteMenuItem(id);
        return ApiResponse.success<GetMenuItemDto>(res)
    }
}
