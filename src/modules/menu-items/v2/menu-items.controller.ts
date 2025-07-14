import { 
    Controller,
    Get,
    Query,
    UseGuards 
} from '@nestjs/common';
import { MenuItemsService } from '../menu-items.service';
import { GetMenuItemDto } from '../dto/get-menuitem.dto';
import { ApiResponse } from '@/common/response/api-response';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { MenuItemParam } from '../dto/menu-item-param.dto';
@UseGuards(JwtAuthGuard)
@Controller({path:'menu-items', version:'2'})
export class MenuItemsV2Controller {
    constructor(private readonly menuitemService: MenuItemsService) {}

    @Public()
    @Get()
    async getMenuItem(@Query() query: MenuItemParam): Promise<ApiResponse<GetMenuItemDto[]>>{
        const res = await this.menuitemService.getMenuItem(query);
        return ApiResponse.success<GetMenuItemDto[]>(res)
    }
    
}
