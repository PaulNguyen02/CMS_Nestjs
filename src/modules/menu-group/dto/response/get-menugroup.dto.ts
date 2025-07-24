import { Expose } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetMenuGroupDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id:string;

    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'is_footer' })
    isFooter: boolean; 
 
}