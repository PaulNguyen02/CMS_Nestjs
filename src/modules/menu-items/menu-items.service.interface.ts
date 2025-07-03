import { GetMenuItemDto } from "./dto/get-menuitem.dto";
import { CreateMenuItemDto } from "./dto/create-menuitem.dto";
import { UpdateMenuItemDto } from "./dto/update-menuitem.dto";
export interface IMenuItemsService {
    create(dto: CreateMenuItemDto): Promise<GetMenuItemDto>;
    update (menu_item_id: string, dto: UpdateMenuItemDto): Promise<GetMenuItemDto>
    get(): Promise<GetMenuItemDto[]>
    delete(menu_item_id: string): Promise<GetMenuItemDto>
}