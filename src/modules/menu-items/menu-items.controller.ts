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
    async create(@Body() dto: CreateMenuItemDto): Promise<ApiResponse<GetMenuItemDto>>{
        try{
            const result = await this.menuitemService.create(dto);
            return ApiResponse.success<GetMenuItemDto>(result);
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }

    @Get()
    async get(): Promise<ApiResponse<GetMenuItemDto[]>>{
        try{
            const res = await this.menuitemService.get();
            return ApiResponse.success<GetMenuItemDto[]>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() update: UpdateMenuItemDto): Promise<ApiResponse<GetMenuItemDto>>{
        try{
            const res = await this.menuitemService.update(id, update);
            return ApiResponse.success<GetMenuItemDto>(res)
        }catch(err){
            return ApiResponse.validationError([{ "field": "title", "error": "lỗi dữ liệu đầu vào" } ]);
        }
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<ApiResponse<GetMenuItemDto>>{
        try{
            const res = await this.menuitemService.delete(id);
            return ApiResponse.success<GetMenuItemDto>(res)
        }catch(err){
            return ApiResponse.error()
        }
    }
}
