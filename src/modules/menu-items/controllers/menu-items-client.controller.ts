import { 
    Controller,
    Get,
    Query
} from '@nestjs/common';
import { MenuItemsService } from '../menu-items.service';
import { GetMenuItemDto } from '../dto/response/get-menuitem.dto';
import { ApiResponse } from '@/common/response/api-response';
import { Public } from '@/common/decorators/public.decorator';
import { MenuItemParam } from '../dto/request/menu-item-param.dto';

@Controller('menu-items')
export class MenuItemsClientController {
    constructor(private readonly menuitemService: MenuItemsService) {}

    @Public()
    @Get()
    async getMenuItem(@Query() query: MenuItemParam): Promise<ApiResponse<GetMenuItemDto[]>>{
        const res = await this.menuitemService.getMenuItem(query);
        return ApiResponse.success<GetMenuItemDto[]>(res)
    }
}
