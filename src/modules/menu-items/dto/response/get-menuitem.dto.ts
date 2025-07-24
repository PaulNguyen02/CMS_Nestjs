import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetMenuGroupDto } from "@/modules/menu-group/dto/response/get-menugroup.dto";
export class GetMenuItemDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'name' })
    name: string;

    @Expose()
    @Type(() => GetMenuGroupDto) // <-- ánh xạ nested object
    menuGroup: GetMenuGroupDto;
}