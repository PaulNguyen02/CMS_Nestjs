import { GetMenuGroupDto } from "./dto/get-menugroup.dto";
import { CreateMenuGroupDto } from "./dto/create-menugroup.dto";
import { UpdateMenuGroupDto } from "./dto/update-menugroup.dto";
export interface IMenuGroupService{
    create(dto: CreateMenuGroupDto): Promise<GetMenuGroupDto>;
    update (menu_group_id: string, dto: UpdateMenuGroupDto): Promise<GetMenuGroupDto>
    get(): Promise<GetMenuGroupDto[]>
    delete(menu_group_id: string): Promise<GetMenuGroupDto>
}