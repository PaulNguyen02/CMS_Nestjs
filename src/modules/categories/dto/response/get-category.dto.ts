import { Expose } from "class-transformer";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetCategoryDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;  
    
    @Expose({ name: 'name' })
    name: string;

    @Expose({ name: 'slug' })
    slug: string;
} 