import { 
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Query,
    Param,
    Body 
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MenuItemsService } from '../menu-items.service';
import { GetMenuItemDto } from '../dto/response/get-menuitem.dto';
import { CreateMenuItemDto } from '../dto/request/create-menuitem.dto';
import { UpdateMenuItemDto } from '../dto/request/update-menuitem.dto';
import { ApiResponse } from '@/common/response/api-response';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { MenuItemParam } from '../dto/request/menu-item-param.dto';

@ApiBearerAuth('access-token')
@Controller('menu-items')
export class MenuItemsCMSController {
    constructor(private readonly menuitemService: MenuItemsService) {}

    @Get()
    async getMenuItem(@Query() query: MenuItemParam): Promise<ApiResponse<GetMenuItemDto[]>>{
        const res = await this.menuitemService.getMenuItem(query);
        return ApiResponse.success<GetMenuItemDto[]>(res)
    }

    @Post()
    async createMenuItem(
        @Body() dto: CreateMenuItemDto,
        @GetUser('username') username: string
    ): Promise<ApiResponse<GetMenuItemDto>>{
        const result = await this.menuitemService.createMenuItem(dto, username);
        return ApiResponse.success<GetMenuItemDto>(result);
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
