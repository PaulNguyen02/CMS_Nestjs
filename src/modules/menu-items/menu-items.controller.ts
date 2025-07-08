import { 
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Body 
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { GetMenuItemDto } from './dto/get-menuitem.dto';
import { CreateMenuItemDto } from './dto/create-menuitem.dto';
import { UpdateMenuItemDto } from './dto/update-menuitem.dto';
import { ApiResponse } from '@/common/response/api-response';
@Controller('menu-items')
export class MenuItemsController {
    constructor(private readonly menuitemService: MenuItemsService) {}

    @Post()
    async createMenuItem(@Body() dto: CreateMenuItemDto): Promise<ApiResponse<GetMenuItemDto>>{
        try{
            const result = await this.menuitemService.createMenuItem(dto);
            return ApiResponse.success<GetMenuItemDto>(result);
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async getMenuItem(): Promise<ApiResponse<GetMenuItemDto[]>>{
        try{
            const res = await this.menuitemService.getMenuItem();
            return ApiResponse.success<GetMenuItemDto[]>(res)
        }catch{
            return ApiResponse.error()
        }
    }
    
    @Put(':id')
    async updateMenuItem(@Param('id') id: string, @Body() update: UpdateMenuItemDto): Promise<ApiResponse<GetMenuItemDto>>{
        try{
            const res = await this.menuitemService.updateMenuItem(id, update);
            return ApiResponse.success<GetMenuItemDto>(res)
        }catch{
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }
    
    @Delete(':id')
    async deleteMenuItem(@Param('id') id: string): Promise<ApiResponse<GetMenuItemDto>>{
        try{
            const res = await this.menuitemService.deleteMenuItem(id);
            return ApiResponse.success<GetMenuItemDto>(res)
        }catch{
            return ApiResponse.error()
        }
    }
}
