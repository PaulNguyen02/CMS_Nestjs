import { Expose, Type } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
import { GetMenuItemDto } from "@/modules/menu-items/dto/get-menuitem.dto";
export class GetMenuGroupDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id:string;

    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'isfooter' })
    isfooter: boolean; 
 
}