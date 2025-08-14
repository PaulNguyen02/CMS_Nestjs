import { Expose, Type } from "class-transformer";
import { GetFileDto } from "@/modules/files/dto/response/get-file.dto";
import { GetBaseDto } from "@/common/dto/get-base.dto";
export class GetPostDto extends GetBaseDto{
    @Expose({ name: 'id' })
    id: string;

    @Expose({ name: 'slug' })
    slug: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'summary' })
    summary: string;

    @Expose({ name: 'content' })
    content: string;

    @Expose({name: 'category'})
    category: string;  
    
    @Expose({name: 'banner'})
    @Type(() => GetFileDto)
    banner: GetFileDto;

    @Expose({name: 'relatedPosts'})
    relatedPosts: GetPostDto[];
}